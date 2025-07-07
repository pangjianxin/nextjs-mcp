"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useCreSettingsForm } from "@/hooks/settings/useCreSettingsForm";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/hooks/use-toast";
import { useCreSettings } from "@/hooks/settings/useCreSettings";

const CreSetting = () => {
  const { toast } = useToast();
  const { data, isLoading, isError } = useCreSettings();

  const { form, submit } = useCreSettingsForm(data!);
  
  const handleSubmit = form.handleSubmit(async (data) => {
    await submit(data);
    toast({
      title: "提示",
      description: "保存成功",
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <Card className="container mx-auto">
          <CardHeader>
            <CardTitle>网站权限设置</CardTitle>
            <CardDescription>
              从这里可以设置网站的相关数据访问权限
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid flex-1 gap-2">
              <FormField
                control={form.control}
                name="maxAnonymousReDailyPriceViewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>非会员可访问的每日价格的最大条目数</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      在未登录或者非会员的情况下，能够访问的每日价格的最大条目数(默认以创建日期进行倒序排序)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAnonymousReIndexViewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>非会员可访问的CRE指数的最大条目数</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      在未登录或者非会员的情况下，能够访问的CRE指数的最大条目数(默认以创建日期进行倒序排序)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAnonymousIaetViewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>非会员可访问的进出口价格的最大条目数</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      在未登录或者非会员的情况下，能够访问的进出口价格的最大条目数(默认以创建日期进行倒序排序)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="justify-end">
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
              >
                提交
              </LoadingButton>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CreSetting;
