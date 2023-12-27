'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { ColorPickerInput } from '@/components/ui/color-picker'
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
import { InputWithFix } from '@/components/ui/input-fix'
import { env } from '@/env'
import { api } from '@/lib/axios'
import { COLORS } from '@/lib/colors'

import { ButtonSignOut } from './components/button-sign-out'

const colorValidator = z.union([
  z.enum(COLORS as [string, ...string[]]),
  z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor hexadecimal invalida'),
])

const createTeamFormSchema = z.object({
  teamName: z
    .string()
    .nonempty({ message: 'O nome do time é obrigatório.' })
    .min(4, {
      message: 'O nome do time deve conter no mínimo 4 letras.',
    }),
  teamNameUrl: z
    .string()
    .nonempty({ message: 'O nome de usuário do time é obrigatório.' })
    .regex(
      /^[a-z]+(-[a-z]+)*$/,
      'O nome do time na url deve conter apenas letras minúsculas e hifens.',
    )
    .min(4, {
      message: 'O nome do time na url deve conter no mínimo 4 letras.',
    })
    .toLowerCase(),
  color: colorValidator,
})

type CreateTeamFormData = z.infer<typeof createTeamFormSchema>

export default function CreateTeam() {
  const router = useRouter()
  const formCreateTeam = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      teamName: 'Exemplo',
      teamNameUrl: '',
      color: '#09090b',
    },
  })

  const watchField = formCreateTeam.watch(['color', 'teamName'])

  const {
    formState: { isSubmitting },
  } = formCreateTeam

  async function onSubmit({
    teamName,
    teamNameUrl,
    color,
  }: CreateTeamFormData) {
    await api.post('/team/create-team', {
      name: teamName,
      teamNameUrl,
      color,
    })

    router.push('/invite-new-participant')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <ButtonSignOut />

      <div className="flex w-full max-w-lg flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Criar novo time</h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Monte uma equipe para integrar e gerenciar um sistema automatizado
            de envio de mensagens no <b>WhatsApp</b>.
          </p>
        </div>
        <Form {...formCreateTeam}>
          <form
            id="create-team"
            onSubmit={formCreateTeam.handleSubmit(onSubmit)}
            className="space-y-5 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
          >
            <FormField
              control={formCreateTeam.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do time</FormLabel>
                  <FormControl>
                    <Input placeholder="Exemplo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formCreateTeam.control}
              name="teamNameUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário do time</FormLabel>
                  <FormControl>
                    <InputWithFix
                      prefix={
                        <span className="font-normal text-slate-500">
                          {env.NEXT_PUBLIC_VERCEL_URL}/
                        </span>
                      }
                      className="font-medium"
                      placeholder="exemplo-de-nome"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este é o nome que ficará na url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formCreateTeam.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aparência</FormLabel>
                  <FormControl>
                    <ColorPickerInput {...field} />
                  </FormControl>
                  <p className="text-xs text-slate-500">
                    <b>Cor do time: </b>
                    <span
                      className="font-medium"
                      style={{ color: watchField[0] }}
                    >
                      {watchField[1]}
                    </span>
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button
          form="create-team"
          className="m-auto flex w-full max-w-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Criar time'
          )}
        </Button>
      </div>
    </main>
  )
}
