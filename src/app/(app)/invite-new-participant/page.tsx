'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { InputWithFix } from '@/components/ui/input-fix'
import { env } from '@/env'
import { api } from '@/lib/axios'
import { COLORS } from '@/lib/colors'

// import { api } from '@/utils/api'

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

export default function InviteNewParticipant() {
  const router = useRouter()
  const { data } = useSession()
  const formCreateTeam = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      teamName: 'Exemplo',
      teamNameUrl: '',
      color: '#09090b',
    },
  })

  const {
    formState: { isSubmitting },
  } = formCreateTeam

  async function onSubmit({
    teamName,
    teamNameUrl,
    color,
  }: CreateTeamFormData) {
    await api.post('/team/invite-new-participant', {
      name: teamName,
      teamNameUrl,
      color,
    })

    router.push('/invite-new-participant')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Convide colegas de trabalho para a seu time
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">
            O <b>Space Sync</b> é feito para ser usado com a sua equipe. Convide
            alguns colegas de trabalho para testá-lo.
          </p>
        </div>
        <Card className="p-6 text-card-foreground shadow-sm">
          <h2 className="text-sm font-semibold">Link de convite</h2>
          <p className="text-xs font-medium">
            Compartilhe este link com outras pessoas que você gostaria que se
            juntassem ao seu espaço de trabalho.
          </p>
          <Form {...formCreateTeam}>
            <form
              id="create-team"
              onSubmit={formCreateTeam.handleSubmit(onSubmit)}
            >
              <FormField
                control={formCreateTeam.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="">
                      <InputWithFix
                        prefix={
                          <span className="font-normal text-slate-500">
                            {env.NEXT_PUBLIC_VERCEL_URL}/
                          </span>
                        }
                        // placeholder="Exemplo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
        <Button
          form="create-team"
          className="m-auto flex w-full max-w-sm font-semibold"
          variant="outline"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Continuar'
          )}
        </Button>
      </div>
    </main>
  )
}
