import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
  model: z.string().default("gpt-4o"),
});

type FormValues = z.infer<typeof formSchema>;

export default function OpenAIGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "gpt-4o",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/openai/generate", data);
      const result = await response.json();
      
      setGeneratedContent(result.content);
      
      toast({
        title: "Content Generated",
        description: "AI-generated content is ready!",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          OpenAI Integration
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Generate content with AI assistance.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prompt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a prompt for content generation..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Model
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                      <SelectItem value="gpt-4-turbo">gpt-4-turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </form>
        </Form>

        {generatedContent && (
          <div className="mt-6">
            <h4 className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Generated Content:</h4>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md text-sm whitespace-pre-wrap">
              {generatedContent}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
