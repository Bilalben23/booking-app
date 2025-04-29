import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createPlaceSchema } from '../schema'
import { Textarea } from '@/components/ui/textarea'
import PerksSelector from '../components/PerksSelector'
import PhotoField from '../components/PhotoField'


export default function CreatePlacePage() {

    const form = useForm<z.infer<typeof createPlaceSchema>>({
        resolver: zodResolver(createPlaceSchema),
        defaultValues: {
            name: "",
            location: "",
            images: [],
            description: "",
            perks: [],
            pricePerNight: 0,
            checkIn: "",
            checkOut: ""
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images" as never
    })

    console.log(form.getValues())

    function onSubmit(values: z.infer<typeof createPlaceSchema>) {

        console.log("data submitted: ")
        console.log(values)
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
                                    <Input placeholder="e.g., My Lovely Beach House" {...field} />
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
                                    <Input placeholder="e.g., 123 Main St, Springfield, USA" {...field} />
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
                        images={form.getValues().images}
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
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <PerksSelector
                        control={form.control}
                    />

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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" size="full">Create</Button>

                </form>
            </Form>

        </div>
    )
}
