import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { createPlaceSchema } from '../schema'
import { Textarea } from '@/components/ui/textarea'
import PerksSelector from '../components/PerksSelector'
import PhotoField from '../components/PhotoField'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { ROUTES } from '@/constants/routes'
import { useEffect } from 'react'
import usePlace from '@/features/home/hooks/usePlace'
import useUpdatePlace from '../hooks/useUpdatePlace'

export default function EditPlacePage() {
    const { placeId } = useParams<{ placeId: string }>()
    const { data: place, isLoading, isError, error } = usePlace(placeId)
    const { mutate: updatePlace, isPending } = useUpdatePlace()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof createPlaceSchema>>({
        resolver: zodResolver(createPlaceSchema),
        defaultValues: {
            name: "",
            location: "",
            images: [],
            description: "",
            perks: [],
            pricePerNight: 0,
            maxGuests: 1,
            checkIn: "",
            checkOut: "",
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images" as never,
    })

    useEffect(() => {
        if (place) {
            form.reset({
                name: place.name || "",
                location: place.location || "",
                images: place.images || [],
                description: place.description || "",
                perks: place.perks || [],
                pricePerNight: place.pricePerNight || 0,
                maxGuests: place.maxGuests || 1,
                checkIn: place.checkIn || "",
                checkOut: place.checkOut || "",
            })
        }
    }, [place, form])

    function onSubmit(values: z.infer<typeof createPlaceSchema>) {
        updatePlace({ placeId, values }, {
            onSuccess: () => {
                toast.success("Place updated successfully!")
                navigate(ROUTES.ACCOUNT.PLACES)
            },
            onError: (err) => {
                toast.error("Failed to update place.")
                console.error(err)
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center p-10">
                <BeatLoader size={10} color="#3b82f6" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="p-10 text-red-500">
                Error: {(error as Error).message || "Failed to load place data"}
            </div>
        )
    }

    return (
        <div className='p-5 md:p-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormDescription>
                                    Give your place a short and catchy name, just like it would appear in an advertisement.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., My Lovely Beach House"
                                        {...field}
                                        readOnly={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormDescription>
                                    Enter the full address of your place, including street name, city, and country.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., 123 Main St, Springfield, USA"
                                        {...field}
                                        readOnly={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <PhotoField
                        fields={fields}
                        append={append}
                        remove={remove}
                        control={form.control}
                        isPending={isPending}
                        images={form.watch("images")}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormDescription>
                                    Provide a short and catchy description of your place to attract guests.
                                </FormDescription>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your place, e.g., Cozy apartment near the beach"
                                        className='min-h-[100px] max-h-[350px]'
                                        {...field}
                                        readOnly={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <PerksSelector control={form.control} />

                    <FormField
                        control={form.control}
                        name="pricePerNight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price per night (USD)</FormLabel>
                                <FormDescription>
                                    Set a competitive nightly price. You can update this later.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 120"
                                        min={0}
                                        step={0.01}
                                        {...field}
                                        readOnly={isPending}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxGuests"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Maximum Guests</FormLabel>
                                <FormDescription>
                                    Specify how many guests can stay at your place. You can update this anytime.
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 4"
                                        min={1}
                                        step={1}
                                        {...field}
                                        readOnly={isPending}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-x-5">
                        <FormField
                            control={form.control}
                            name="checkIn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check-in Time</FormLabel>
                                    <FormDescription>
                                        Guests can arrive from this time onward.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder="e.g., 14:00"
                                            {...field}
                                            readOnly={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="checkOut"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check-out Time</FormLabel>
                                    <FormDescription>
                                        Guests must leave by this time.
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder="e.g., 11:00"
                                            {...field}
                                            readOnly={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isPending || !form.formState.isDirty}
                        >
                            {isPending ? <BeatLoader size={10} color="#fff" /> : "Update Place"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate(ROUTES.ACCOUNT.PLACES)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}