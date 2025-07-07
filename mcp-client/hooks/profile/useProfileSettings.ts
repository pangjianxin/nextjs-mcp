import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdate, VoloAbpAccountProfileDto } from "@/openapi";

export const useProfileSettings = (profile: VoloAbpAccountProfileDto) => {
  const schema = z.object({
    userName: z.string().min(1, { message: "用户名不能为空" }),
    email: z
      .string()
      .min(1, { message: "邮箱不能为空" })
      .email({ message: "邮箱格式不正确" }),
    name: z.string().min(1, { message: "名字不能为空" }),
    surname: z.string().optional(),
    phoneNumber: z.string().optional(),
    concurrencyStamp: z.string().optional(),
  });

  type FormValue = z.infer<typeof schema>;

  const form = useForm<FormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: profile?.userName as string,
      email: profile?.email as string,
      name: profile?.name as string,
      surname: profile?.surname ?? undefined,
      phoneNumber: profile?.phoneNumber ?? undefined,
      concurrencyStamp: profile?.concurrencyStamp as string,
    },
  });

  const onSubmit = async (data: FormValue) => {
    await profileUpdate({
      throwOnError: true,
      body: data,
    });
  };

  return {
    form,
    onSubmit,
  };
};
