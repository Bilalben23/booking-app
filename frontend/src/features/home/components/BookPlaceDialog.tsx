import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, addDays, isToday, isAfter, isBefore, differenceInDays } from 'date-fns'
import { CalendarIcon, Info } from 'lucide-react'
import { z } from 'zod'
import { bookingSchema } from '../schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import useBookPlace from '../hooks/useBookPlace'
import { toast } from 'react-hot-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

type BookPlaceDialogProps = {
    placeId: string
    placeName: string
    maxGuests: number
    pricePerNight: number
}

export function BookPlaceDialog({
    placeId,
    placeName,
    maxGuests,
    pricePerNight
}: BookPlaceDialogProps) {
    const [open, setOpen] = useState(false)
    const today = new Date();
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            checkIn: today,
            checkOut: addDays(today, 1),
            guests: 1
        }
    })

    const { mutate: bookPlace, isPending } = useBookPlace()

    const handleSubmit = (values: z.infer<typeof bookingSchema>) => {
        bookPlace({ placeId, ...values }, {
            onSuccess: () => {
                toast.success('Booking confirmed!');
                navigate(ROUTES.ACCOUNT.BOOKINGS);
            },
            onError: () => toast.error('Booking failed. Please try again.')
        })
    }

    const isBeforeToday = (date: Date) => {
        return !isToday(date) && !isAfter(date, today)
    }

    const disabledDates = (date: Date) => isBeforeToday(date)

    const watchedCheckIn = form.watch('checkIn')
    const watchedCheckOut = form.watch('checkOut')

    // Calculate the total price reactively (without multiplying by guests)
    const totalPrice = useMemo(() => {
        const numOfNights = differenceInDays(watchedCheckOut, watchedCheckIn)
        return numOfNights > 0 ? numOfNights * pricePerNight : 0
    }, [watchedCheckIn, watchedCheckOut, pricePerNight])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Book Now</Button>
            </DialogTrigger>

            <DialogContent className="max-w-sm">
                <DialogHeader className='border-b pb-2.5'>
                    <DialogTitle className='text-center line-clamp-1 ml-3'>Book {placeName}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {/* Check-in Date */}
                        <FormField
                            control={form.control}
                            name="checkIn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check-in</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn('w-full justify-start', !field.value && 'text-muted-foreground')}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, 'PPP') : 'Select date'}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={disabledDates}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Check-out Date */}
                        <FormField
                            control={form.control}
                            name="checkOut"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check-out</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn('w-full justify-start', !field.value && 'text-muted-foreground')}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, 'PPP') : 'Select date'}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    isBeforeToday(date) ||
                                                    isBefore(date, addDays(form.getValues('checkIn'), 1)) // Ensure check-out is after check-in
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Guests */}
                        <FormField
                            control={form.control}
                            name="guests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Guests (max {maxGuests})</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={maxGuests}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-2 font-medium">
                            <span>Total (nights × price):</span>
                            <span>${totalPrice.toFixed(2)} USD</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={18} className="cursor-pointer text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Pay this amount upon arrival.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>



                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Booking...' : 'Confirm Booking'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
