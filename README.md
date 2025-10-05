> "Esse projeto é um sistema de **gerenciamento de presentes e convidados**.  
> 
> No **banco de dados**, temos dois modelos principais: **Convidado** e **TabelaDePresentes**, ligados por uma relação 1-para-1. Cada convidado pode escolher apenas um presente, e cada presente só pode ser associado a um convidado.  
> 
> O **backend** foi feito em **Express + Prisma**. Criamos rotas para adicionar, listar, excluir presentes, além de permitir que convidados escolham presentes usando um token. Também temos rotas administrativas para listar convidados e remover vínculos entre presentes e convidados.  
> 
> No **frontend**, utilizamos **Next.js com Tailwind e Shadcn/UI** para montar a interface. Implementamos uma barra de navegação administrativa que leva para três áreas:  
> - Presentes (onde o admin pode adicionar e excluir presentes)  
> - Remover Seleção (para desvincular um presente já escolhido)  
> - Convidados (para listar todos os convidados).  
> - Enviar Convites (para gerar o link de convite para os convidados)
> No fluxo completo:  
> 1. O administrador adiciona presentes ao sistema.  
> 2. O convidado acessa e escolhe um presente.  
> 3. A API valida a escolha e vincula o presente ao convidado.  
> 4. O administrador pode gerenciar tudo pelo painel.  
> 
> Além disso, tenho validações tanto no frontend quanto no backend **toasts de feedback** para confirmar ações ou exibir erros."  

---
