'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const createTeamFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'O nome de usuário é obrigatório.' })
    .regex(/^[a-z]+(-[a-z]+)*$/)
    .min(1, {
      message:
        'O nome do time na url deve conter apenas letras minúsculas e hifens.',
    })
    .toLowerCase(),
  teamName: z.string().min(4, {
    message: 'O nome do time deve conter no mínimo 4 letras.',
  }),
})

type CreateTeamFormData = z.infer<typeof createTeamFormSchema>

export default function createTeam() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      username: '',
    },
  })

  const { status, data } = useSession()

  function onSubmit(values: CreateTeamFormData) {
    console.log(values)
  }

  console.log(status, data)

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <div>
        <Button
          className="absolute left-6 top-6"
          variant="ghost"
          onClick={() => signOut()}
        >
          Sair
        </Button>
      </div>
      <div className="max-w-lg w-full gap-8 flex flex-col">
        <div className=" text-center">
          <h1 className="text-3xl font-bold">Criar novo time</h1>
          <p className="text-sm mt-6 text-muted-foreground">
            Monte uma equipe para integrar e gerenciar um sistema automatizado
            de envio de mensagens no <b>WhatsApp</b>.
          </p>
        </div>
        <Form {...form}>
          <form
            id="create-team"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 bg-card text-card-foreground shadow-sm border p-4 rounded-lg"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do time</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário do time</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo-exemplo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este é o nome que ficará na url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button form="create-team" className="w-full max-w-sm flex m-auto">
          Criar time
        </Button>
      </div>
    </main>
  )
}
