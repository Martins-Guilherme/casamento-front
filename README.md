> "Esse projeto é um sistema de **gerenciamento de presentes e convidados**.  
> 
> No **banco de dados**, temos três modelos principais: **Convidado**, **Evento** e **TabelaDePresentes**, ligados por uma relação 1-para-1 **Convidado** e **TabelaDePresentes**. Cada convidado pode escolher apenas um presente, e cada presente só pode ser associado a um convidado.  
> 
> O **backend** foi feito em **Express + Prisma**. Foi criado rotas para adicionar, listar, excluir presentes, além de permitir que convidados escolham presentes usando um token. Também foi feito rotas administrativas para listar convidados e remover vínculos entre presentes e convidados.  
> 
> No **frontend**, foi utilizado o **Next.js com Tailwind e Shadcn/UI** para montar a interface. Implementado uma barra de navegação administrativa que leva para quatro áreas:  
> - Presentes (onde o admin pode adicionar e excluir presentes)  
> - Remover Seleção (para desvincular um presente já escolhido)  
> - Convidados (para listar todos os convidados).  
> - Enviar Convites (para gerar o link de convite para os convidados)
> - Cadastrar Evento (para criar o evento que sera apresentado ao convidado)
> No fluxo completo:  
> 1. O administrador adiciona presentes ao sistema.  
> 2. O convidado acessa e escolhe um presente.  
> 3. A API valida a escolha e vincula o presente ao convidado.  
> 4. O administrador pode gerenciar tudo pelo painel.  
> 
> Além disso, tenho validações tanto no frontend quanto no backend **toasts de feedback** para confirmar ações ou exibir erros."  

---
