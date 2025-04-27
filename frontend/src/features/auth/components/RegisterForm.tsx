import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { closeDialog, setCredentials } from "../state/authSlice";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


const RegisterResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string()
    }),
    accessToken: z.string()
})


const RegisterForm = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const dispatch = useDispatch<AppDispatch>();
    const { redirectPath } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();


    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            const { data } = await axiosInstance.post("v1/auth/register", values);

            const parsed = RegisterResponseSchema.safeParse(data);

            if (!parsed.success) {
                console.error("Invalid register response: ", parsed.error.format());
                toast.error("Invalid server response. Please contact support.");
                return;
            }

            dispatch(setCredentials({
                user: parsed.data.user,
                accessToken: parsed.data.accessToken
            }))
            dispatch(closeDialog());
            toast.success(parsed.data.message);
            navigate(redirectPath);

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const response = err.response?.data;

                if (response?.errors) {
                    // handle validation errors
                    response.errors.forEach((validationError: { field: "name" | "email" | "password"; msg: string }) => {
                        form.setError(validationError.field, { message: validationError.msg });
                    })
                    return;
                } else if (response?.message) {
                    toast.error(response.message);
                } else {
                    toast.error("An unknown error occurred.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your name"
                                    readOnly={form.formState.isSubmitting}
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="bilal@example.com"
                                    readOnly={form.formState.isSubmitting}
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    readOnly={form.formState.isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    size="full"
                    variant="destructive"
                    className="w-full rounded-md"
                    disabled={form.formState.isSubmitting || !form.formState.isDirty}
                >
                    {
                        form.formState.isSubmitting
                            ? <BeatLoader size={10} color="#fff" />
                            : "Register"
                    }
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;