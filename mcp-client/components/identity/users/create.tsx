"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateUser } from "@/hooks/identity/useCreateUser";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useAssignableRoles } from "@/hooks/identity/useAssignableRoles";
import Loader from "@/components/sections/loader";
const CreateUser: FC = () => {
  const { data: userAssignableRoles, isLoading } = useAssignableRoles();
  const { form, submit } = useCreateUser();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    await submit(data);
    handleClose();
  });
  if (isLoading) return <Loader />;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <Form {...form}>
        <form onSubmit={handleSubmit} id="crete-user-form">
          <DialogContent
            className="sm:max-w-md"
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>创建用户</DialogTitle>
              <DialogDescription>
                为用户绑定角色时需谨慎，角色代表能够操纵系统功能的一个集合
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="user-info" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user-info">用户信息</TabsTrigger>
                <TabsTrigger value="role-info">角色信息</TabsTrigger>
              </TabsList>
              <TabsContent value="user-info">
                <div className="grid flex-1 gap-2">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>登录名称</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="登录名称"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          登录名称为用户登陆时输入的名称
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户名称</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="用户名称"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          用户名称为系统显示用户名称
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户昵称</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="用户昵称"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          用户昵称为系统显示用户昵称
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户密码</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="用户密码"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          用户密码为用户登录时所需凭证
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户邮箱</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="用户邮箱"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          用户邮箱可以作为用户找回密码、重置密码等功能的验证手段
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>手机号</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="手机号" {...field} />
                        </FormControl>
                        <FormDescription>
                          手机号可以作为用户找回密码、重置密码等功能的验证手段
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>是否激活</FormLabel>
                          <FormDescription>
                            用户处于非激活状态时将不可用
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lockoutEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>登录失败次数超限时是否锁定</FormLabel>
                          <FormDescription>
                            勾选该选项用户登录失败次数超限时将锁定，锁定用户将不能继续登录
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="role-info">
                <FormField
                  control={form.control}
                  name="roleNames"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          选择用户角色
                        </FormLabel>
                        <FormDescription>
                          您可以为用户分配多个角色。
                        </FormDescription>
                      </div>
                      {userAssignableRoles?.items?.map((role) => (
                        <FormField
                          key={role.id}
                          control={form.control}
                          name="roleNames"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={role.name}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.name!)}
                                    onCheckedChange={(checked) => {
                                      const updatedRoles = checked
                                        ? [...field.value!, role.name]
                                        : field.value?.filter(
                                            (value: string) =>
                                              value !== role.name
                                          );
                                      field.onChange(updatedRoles);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {role.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => form.reset()}
                >
                  关闭
                </Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                form="crete-user-form"
                loading={form.formState.isSubmitting}
                disabled={!form.formState.isValid}
              >
                提交
              </LoadingButton>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default CreateUser;
