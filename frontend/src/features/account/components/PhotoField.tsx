import { FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, Plus } from 'lucide-react';

type PhotoProps = {
    fields: { id: string }[];
    append: (value: string) => void;
    remove: (index: number) => void;
    control: any;
    images: string[];
};

export default function PhotoField({ fields, append, remove, control, images }: PhotoProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Photos</label>
                <p className="text-sm text-muted-foreground">Add photo URLs</p>
            </div>

            {images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {images.map((image, index) =>
                        image ? (
                            <img
                                key={index}
                                src={image}
                                alt={`Uploaded photo ${index + 1}`}
                                className="w-24 h-24 object-cover rounded border"
                            />
                        ) : null
                    )}
                </div>
            )}

            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={control}
                    name={`images.${index}`}
                    render={({ field }) => (
                        <div className="flex gap-2 items-start">
                            <div className="w-full">
                                <Input
                                    {...field}
                                    type="url"
                                    placeholder="Image URL"
                                    className="w-full"
                                />
                                <FormMessage />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                                aria-label={`Remove image ${index + 1}`}
                            >
                                <Trash size={16} />
                            </Button>
                        </div>
                    )}
                />
            ))}

            <Button type="button" variant="outline" onClick={() => append('')}>
                <Plus size={16} className="mr-2" />
                Add Photo
            </Button>
        </div>
    );
}
