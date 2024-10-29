import Head from "next/head";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CreateContent from "@/components/CreateContent/CreateContent";

export default function CreatePage() {
  return (
    <>
      <Head>
        <title>Criar Jogo &copy; 2024</title>
        <meta name="description" content="Página para criar um novo jogo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu />
        <Container>
          <CreateContent />
        </Container>
      </main>
      <Footer />
    </>
  );
}


