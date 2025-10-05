import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Handler principal
export async function POST(req: Request) {
  try {
    // 1️⃣ Define o diretório de destino (público)
    const uploadDir = path.join(process.cwd(), "public", "presentes");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // 2️⃣ Converte o corpo em stream — necessário no Next App Router
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: (part) => part.mimetype?.startsWith("image/") || false,
      filename: (name, ext, part, form) => {
        const unique = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`;
        return `${unique}${path.extname(part.originalFilename || "")}`;
      },
    });

    const buffers = await req.arrayBuffer();
    const buffer = Buffer.from(buffers);

    // Cria um mock de IncomingMessage para o formidable
    const { Readable } = await import("stream");
    // Import the IncomingMessage type for type annotation
    type IncomingMessageType = import("http").IncomingMessage;
    const { IncomingMessage } = await import("http");

    class BufferIncomingMessage extends Readable {
      headers;
      method: string;
      url: string;
      constructor(buffer: Buffer) {
        super();
        this.headers = {};
        this.method = "POST";
        this.url = "";
        this.push(buffer);
        this.push(null);
      }
    }

    const mockReq = new BufferIncomingMessage(buffer);
    const [fields, files] = await new Promise<
      [formidable.Fields, formidable.Files]
    >((resolve, reject) =>
      form.parse(
        mockReq as unknown as IncomingMessageType,
        (err, fields, files) => (err ? reject(err) : resolve([fields, files]))
      )
    );

    const nome = Array.isArray(fields.nome) ? fields.nome[0] : fields.nome;
    const descricao = Array.isArray(fields.descricao)
      ? fields.descricao[0]
      : fields.descricao;
    const file = Array.isArray(files.imagem) ? files.imagem[0] : files.imagem;

    if (!nome) {
      return NextResponse.json(
        { error: "O campo 'nome' é obrigatório." },
        { status: 400 }
      );
    }
    if (!file?.newFilename) {
      return NextResponse.json(
        { error: "Erro: nenhuma imagem foi enviada." },
        { status: 400 }
      );
    }

    const imageUrl = `/presentes/${file.newFilename}`;

    const presente = await prisma.tabelaDePresentes.create({
      data: {
        nome: String(nome),
        descricao: descricao ? String(descricao) : null,
        imagem: imageUrl,
      },
    });

    return NextResponse.json(presente, { status: 201 });
  } catch (error) {
    console.error("❌ Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload do presente." },
      { status: 500 }
    );
  }
}
