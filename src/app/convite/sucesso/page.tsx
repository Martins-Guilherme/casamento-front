export default function SucessoPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const token = searchParams.token;

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">🎉 Obrigado por participar!</h1>
      <p className="text-gray-600">
        Seu registro foi criado com sucesso. <br />
        Seu token é: <strong>{token}</strong>
        <br />
        Guarde este token para futuras consultas.
      </p>
      <p className="mt-2">Você receberá uma confirmação em breve.</p>
    </div>
  );
}
