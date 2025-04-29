import { Controller } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { perks } from '../constants/perks'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronsUpDown } from 'lucide-react'


export default function PerksSelector({ control }: any) {
    return (
        <Controller
            control={control}
            name="perks"
            render={({ field }) => (
                <div>
                    <label className="block font-medium text-sm">Perks</label>
                    <p className="text-muted-foreground text-sm mb-2">Select one or more</p>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full h-auto min-h-[42px] justify-between whitespace-normal break-words text-left"
                            >
                                <span className="flex-1 text-left break-words">
                                    {field.value?.length > 0 ? field.value.join(', ') : 'Select perks'}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-full p-2 space-y-1 max-h-64 overflow-y-auto">
                            {perks.map(({ label, icon: Icon }) => {
                                const isSelected = field.value.includes(label)
                                return (
                                    <div
                                        key={label}
                                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-accent"
                                        onClick={() => {
                                            const newValue = isSelected
                                                ? field.value.filter((p: string) => p !== label)
                                                : [...field.value, label]
                                            field.onChange(newValue)
                                        }}
                                    >
                                        <Checkbox checked={isSelected} />
                                        <Icon className="w-4 h-4 text-muted-foreground" />
                                        <span>{label}</span>
                                    </div>
                                )
                            })}
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        />
    )
}
