"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/app/hooks/userLoginModal";
import useRegisterModal from "@/app/hooks/userRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../Button";
import Heading from "../Heading";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Login realizado com sucesso!");
          loginModal.onClose();
          router.refresh();
        } else {
          toast.error("Credenciais inválidas. Verifique e tente novamente.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { redirect: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("OAuthAccountNotLinked")) {
          toast.error(
            "Esse e-mail já está vinculado a outro método de login. Use e-mail e senha."
          );
        } else {
          toast.error("Erro ao tentar login com o Google.");
        }
      } else {
        toast.error("Erro desconhecido ao tentar login com o Google.");
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem-vindo de volta" subtitle="Acesse sua conta" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Entrar com o Google"
        icon={FcGoogle}
        onClick={handleGoogleSignIn}
      />

      <div className="text-neutral-600 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Primeira vez aqui?</div>
          <div
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
            className="text-blue-900 cursor-pointer hover:underline"
          >
            Criar uma conta
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Entrar"
      actionLabel="Continuar"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
