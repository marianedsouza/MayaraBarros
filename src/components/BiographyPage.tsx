import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Printer,
  Download,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import mayaraPhoto from '../assets/mayara-barros-livro.jpeg';

interface BiographyPageProps {
  onBackToCard: () => void;
}

export const BiographyPage: React.FC<BiographyPageProps> = ({ onBackToCard }) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}#biografia`
    : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleShareWhatsApp = () => {
    const text = `*Mayara Barros — Perfil Executivo | 2026*\nEstrategista em Desenvolvimento Institucional e Projetos de Impacto\nTransformar intenção em direção. E direção em projetos que acontecem.\n${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    try {
      const page1 = document.getElementById('pdf-page-1');
      const page2 = document.getElementById('pdf-page-2');

      if (!page1 || !page2) {
        throw new Error('Páginas não encontradas no documento');
      }

      // Configure high-resolution rendering
      const canvasOptions = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FAF8F5',
        logging: false,
        onclone: (clonedDoc: Document) => {
          const clonedPage1 = clonedDoc.getElementById('pdf-page-1');
          const clonedPage2 = clonedDoc.getElementById('pdf-page-2');
          [clonedPage1, clonedPage2].forEach((el) => {
            if (el) {
              el.style.width = '800px';
              el.style.minWidth = '800px';
              el.style.maxWidth = '800px';
              el.style.height = '1131px';
              el.style.minHeight = '1131px';
              el.style.maxHeight = '1131px';
              el.style.boxShadow = 'none';
              el.style.border = 'none';
              el.style.margin = '0';
              el.style.overflow = 'hidden';
            }
          });
        },
      };

      const canvas1 = await html2canvas(page1, canvasOptions);
      const canvas2 = await html2canvas(page2, canvasOptions);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const imgWidth = 210;
      const imgHeight = 297;

      const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);

      pdf.addImage(imgData1, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.addPage('a4', 'portrait');
      pdf.addImage(imgData2, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

      pdf.save('Mayara_Barros_Perfil_Executivo_2026.pdf');
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3000);
    } catch (err) {
      console.error('PDF export error:', err);
      // Fallback to browser print which triggers the @media print styling perfectly
      window.print();
    } finally {
      window.scrollTo(scrollX, scrollY);
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAE7E1] text-[#2D2828] flex flex-col items-center py-2 sm:py-5 pb-6 sm:pb-10 print:block print:w-[210mm] print:min-h-0 print:py-0 print:pb-0 print:bg-[#FAF8F5] relative antialiased selection:bg-[#631B26] selection:text-white">
      {/* Top Action Bar (Hidden during print) */}
      <nav
        aria-label="Menu de Ações"
        className="print:hidden w-full max-w-[820px] px-2.5 sm:px-4 md:px-0 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        {/* Voltar ao Cartão e Baixar PDF (Mobile Row 1) */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={onBackToCard}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-8.5 px-3 rounded-lg bg-white/95 hover:bg-[#631B26] text-[#631B26] hover:text-white border border-[#631B26]/20 hover:border-[#631B26] text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-xs cursor-pointer group whitespace-nowrap"
            title="Voltar ao Cartão Digital"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span>Voltar ao Cartão</span>
          </button>

          {/* Baixar PDF on Mobile (side by side with Voltar for priority) */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            title="Baixar PDF Oficial"
            className="sm:hidden flex-1 inline-flex items-center justify-center gap-1.5 h-8.5 px-3 rounded-lg bg-[#631B26] hover:bg-[#4F131D] text-white border border-[#631B26] text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-xs cursor-pointer disabled:opacity-70 whitespace-nowrap"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span>Gerando...</span>
              </>
            ) : pdfDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Baixado!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Baixar PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Toolbar: Copiar Link, WhatsApp, Imprimir (and Baixar PDF on desktop) */}
        <div className="grid grid-cols-3 sm:flex items-center gap-1.5 w-full sm:w-auto">
          {/* Copiar Link */}
          <button
            onClick={handleCopyLink}
            title="Copiar Link"
            className="inline-flex items-center justify-center gap-1.5 h-8.5 px-2 sm:px-3 rounded-lg bg-white/95 hover:bg-[#631B26] text-[#631B26] hover:text-white border border-[#631B26]/20 hover:border-[#631B26] text-[11px] sm:text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-xs cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-300 shrink-0" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span>Copiar Link</span>
              </>
            )}
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            title="Compartilhar no WhatsApp"
            className="inline-flex items-center justify-center gap-1.5 h-8.5 px-2 sm:px-3 rounded-lg bg-white/95 hover:bg-[#631B26] text-[#631B26] hover:text-white border border-[#631B26]/20 hover:border-[#631B26] text-[11px] sm:text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>WhatsApp</span>
          </button>

          {/* Imprimir */}
          <button
            onClick={handlePrint}
            title="Imprimir Perfil"
            className="inline-flex items-center justify-center gap-1.5 h-8.5 px-2 sm:px-3 rounded-lg bg-white/95 hover:bg-[#631B26] text-[#631B26] hover:text-white border border-[#631B26]/20 hover:border-[#631B26] text-[11px] sm:text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 shrink-0" />
            <span>Imprimir</span>
          </button>

          {/* Baixar PDF (Desktop only) */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            title="Baixar PDF Oficial"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-8.5 px-3.5 rounded-lg bg-[#631B26] hover:bg-[#4F131D] text-white border border-[#631B26] text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 shadow-xs cursor-pointer disabled:opacity-70 whitespace-nowrap"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span>Gerando...</span>
              </>
            ) : pdfDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Baixado!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Baixar PDF</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main A4 Document Sheets */}
      <main
        ref={contentRef}
        className="print-wrapper w-full max-w-[820px] flex flex-col items-center gap-4 sm:gap-6 print:gap-0 px-2 sm:px-4 md:px-0"
      >
        {/* ======================= PAGE 1 ======================= */}
        <section
          id="pdf-page-1"
          className="a4-page relative flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.1)] print:shadow-none border border-[#631B26]/10 print:border-none overflow-hidden rounded-[2px] sm:rounded-none"
        >
          {/* Top Wine Strip */}
          <div className="w-full h-[14px] sm:h-[18px] bg-[#631B26] shrink-0" />

          {/* Page 1 Body */}
          <div className="px-5 py-6 sm:px-8 sm:py-8 md:px-14 md:pt-8 md:pb-6 flex-grow flex flex-col justify-between">
            <div>
              {/* Header: Title, Kicker & Portrait */}
              <div className="flex flex-row justify-between items-start gap-3 sm:gap-6 mb-5 sm:mb-6">
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-sans font-bold text-[10.5px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.2em] text-[#631B26] mb-1.5">
                    Perfil Executivo | 2026
                  </div>
                  <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-[50px] leading-[1.05] text-[#1A1818] tracking-tight mb-2 sm:mb-2.5">
                    MAYARA<br />BARROS
                  </h1>
                  <div className="font-sans font-semibold text-[11.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.3] text-[#631B26] mb-2 sm:mb-4">
                    Estrategista em Desenvolvimento Institucional<br />e Projetos de Impacto
                  </div>
                  <div className="font-serif font-bold text-[13px] sm:text-[16px] md:text-[17.5px] leading-[1.28] text-[#1A1818]">
                    Transformar intenção em direção.<br />
                    E direção em projetos que acontecem.
                  </div>
                </div>

                {/* Official Portrait */}
                <div className="shrink-0 self-start">
                  <div className="w-[110px] h-[155px] sm:w-[170px] sm:h-[238px] md:w-[215px] md:h-[285px] bg-[#E5E0D8] rounded-[2px] overflow-hidden shadow-sm border border-[#631B26]/20">
                    <img
                      src={mayaraPhoto}
                      alt="Mayara Barros"
                      className="w-full h-full object-cover object-[center_36%]"
                    />
                  </div>
                </div>
              </div>

              {/* Introductory Paragraphs */}
              <div className="space-y-2.5 text-[12px] sm:text-[12.5px] md:text-[13px] leading-[1.58] text-[#2D2828] mb-5 text-left">
                <p className="font-medium text-[#1A1818]">
                  Mayara Barros atua conectando estratégia, pessoas, instituições e territórios para transformar desafios em soluções, projetos e resultados concretos.
                </p>
                <p>
                  Sua trajetória atravessa a administração pública, a política, a iniciativa privada e o terceiro setor. Diferentes ambientes que construíram, ao longo dos anos, uma mesma capacidade: ler cenários, encontrar caminhos, aproximar pessoas e instituições e transformar ideias em projetos capazes de acontecer.
                </p>
                <p className="font-medium text-[#1A1818]">
                  Hoje, essa experiência converge para uma atuação voltada ao desenvolvimento institucional e à construção de projetos de impacto, conectando estratégia à execução e propósito a resultados.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full border-b-[1.5px] border-[#631B26] mb-5" />

              {/* Two Column Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 text-[12px] md:text-[12.5px] leading-[1.52] text-[#2D2828] text-left">
                {/* Column 1: Gestão Pública & Política */}
                <div className="space-y-4">
                  <div>
                    <h2 className="font-sans font-bold text-[11px] md:text-[11.5px] uppercase tracking-[0.05em] text-[#631B26] mb-1.5 sm:mb-2 leading-snug">
                      Uma Trajetória Construída por Dentro das Instituições
                    </h2>
                    <div className="space-y-2">
                      <p>
                        Mayara começou a trabalhar aos <strong>16 anos</strong>. Entre <strong>2013 e 2024</strong>, construiu mais de uma década de experiência na administração pública de Mato Grosso do Sul.
                      </p>
                      <p>
                        Passou pelas Secretarias de Estado de <strong>Saúde, Fazenda e Educação</strong>, pela <strong>Fundesporte</strong> e pela <strong>Casa Civil</strong>, atuando em administração e finanças, controladoria, planejamento, projetos, gabinete e articulação institucional.
                      </p>
                      <p>
                        Essa experiência lhe permitiu conhecer as estruturas públicas por dentro e compreender como decisões, instituições e projetos se conectam às pessoas e aos territórios onde seus efeitos realmente acontecem.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-sans font-bold text-[11px] md:text-[11.5px] uppercase tracking-[0.05em] text-[#631B26] mb-1.5 sm:mb-2 leading-snug">
                      Política, Mobilização e Participação
                    </h2>
                    <div className="space-y-2">
                      <p>
                        Sua trajetória política começou em <strong>2016</strong> e reúne experiências em estratégia, mobilização, organização e formação de equipes, planejamento e operações de campanhas municipais, estaduais e federais.
                      </p>
                      <p>
                        Em <strong>2024</strong>, foi candidata ao Legislativo Municipal de Campo Grande. Atualmente, preside a <strong>Ação da Mulher Trabalhista de Mato Grosso do Sul - AMT/MS | PDT</strong>, com atuação na organização e ampliação da participação das mulheres nos espaços políticos e de decisão.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 2: Grupo Novo Horizonte */}
                <div>
                  <div>
                    <h2 className="font-sans font-bold text-[11px] md:text-[11.5px] uppercase tracking-[0.05em] text-[#631B26] mb-1.5 sm:mb-2 leading-snug">
                      Da Experiência à Construção
                    </h2>
                    <div className="space-y-2">
                      <p>
                        Mayara é sócia e cofundadora do <strong>Grupo Novo Horizonte®</strong>, ecossistema que conecta quatro frentes: <strong>Synapt Essence, Escola da Consciência Viva, Mundial Business e Instituto Novo Horizonte</strong>.
                      </p>
                      <p>
                        Cada frente atua a partir de uma dimensão própria, conectando desenvolvimento humano, formação, estratégia, negócios e impacto social sob uma visão comum:
                      </p>
                      <div className="py-1 space-y-0.5 font-serif font-bold text-[13.5px] md:text-[14px] text-[#631B26]">
                        <div>Pessoas fortalecidas.</div>
                        <div>Comunidades vivas.</div>
                        <div>Territórios regenerados.</div>
                      </div>
                      <p>
                        Dentro desse ecossistema, a <strong>Mundial Business</strong> representa a frente de estratégia, desenvolvimento institucional e projetos de impacto - território diretamente conectado à atuação profissional que Mayara vem consolidando.
                      </p>
                      <p>
                        No <strong>Instituto Novo Horizonte</strong>, onde exerce a vice-presidência, participa do desenvolvimento de projetos voltados a mulheres, famílias e comunidades, entre eles o <strong>Horizonte Mulher</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wine Strip */}
          <div className="w-full h-[14px] sm:h-[18px] bg-[#631B26] shrink-0" />
        </section>

        {/* ======================= PAGE 2 ======================= */}
        <section
          id="pdf-page-2"
          className="a4-page pdf-page-2 relative flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.1)] print:shadow-none border border-[#631B26]/10 print:border-none overflow-hidden rounded-[2px] sm:rounded-none"
        >
          {/* Top Wine Strip */}
          <div className="w-full h-[14px] sm:h-[18px] bg-[#631B26] shrink-0" />

          {/* Page 2 Body */}
          <div className="px-5 py-6 sm:px-8 sm:py-8 md:px-14 md:pt-8 md:pb-8 flex-grow flex flex-col justify-between text-left">
            <div>
              {/* Kicker & Title */}
              <div className="font-sans font-bold text-[10.5px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.2em] text-[#631B26] mb-1.5">
                Movimento, Formação e Direção
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-[38px] leading-[1.1] text-[#1A1818] tracking-tight mb-3 sm:mb-4">
                RÁZGA: QUANDO UMA EXPERIÊNCIA<br />SE TORNA MOVIMENTO
              </h2>

              <div className="space-y-2.5 text-[12px] sm:text-[12.5px] md:text-[13px] leading-[1.55] text-[#2D2828] mb-4">
                <p>
                  Mayara é fundadora do <strong>Movimento RÁZGA®</strong>, que nasceu de sua própria travessia por experiências de violência e silenciamento familiar, político e institucional. O que começou como uma ruptura individual encontrou outras histórias e ganhou dimensão coletiva.
                </p>
                <p>
                  Hoje, o RÁZGA conecta pessoas, lideranças, comunidades, movimentos e instituições em torno de uma escolha comum: não normalizar o silenciamento das mulheres e construir caminhos para que suas próprias vozes e demandas encontrem espaço e possam chegar aos lugares onde decisões são tomadas.
                </p>
              </div>

              {/* Methodology Framework Ribbon */}
              <div className="w-full border-[1.5px] border-[#1A1818]/80 py-2 sm:py-2.5 px-2 sm:px-4 mb-3.5 flex items-center justify-between text-center rounded-[1px] bg-[#FAF8F5]">
                <span className="font-sans font-bold text-[9.5px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.05em] sm:tracking-[0.14em] text-[#1A1818]">
                  Escutar
                </span>
                <span className="text-[#631B26] font-bold text-[12px] sm:text-[14px]">→</span>
                <span className="font-sans font-bold text-[9.5px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.05em] sm:tracking-[0.14em] text-[#1A1818]">
                  Nomear
                </span>
                <span className="text-[#631B26] font-bold text-[12px] sm:text-[14px]">→</span>
                <span className="font-sans font-bold text-[9.5px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.05em] sm:tracking-[0.14em] text-[#1A1818]">
                  Romper
                </span>
                <span className="text-[#631B26] font-bold text-[12px] sm:text-[14px]">→</span>
                <span className="font-sans font-bold text-[9.5px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.05em] sm:tracking-[0.14em] text-[#1A1818]">
                  Construir
                </span>
              </div>

              {/* Manifesto Quote */}
              <div className="text-center my-3 sm:my-3.5 px-2">
                <p className="font-serif font-bold text-[13.5px] sm:text-[15px] md:text-[16px] text-[#631B26] leading-snug">
                  “O que há de humano em mim não aceita mais normalizar o silenciamento de uma mulher.”
                </p>
              </div>

              {/* Divider */}
              <div className="w-full border-b-[1.5px] border-[#631B26] mb-5" />

              {/* Two Column: Direito e Novos Caminhos vs Atuação Atual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 text-[12px] md:text-[12.5px] leading-[1.52] text-[#2D2828] mb-6 sm:mb-8">
                {/* Direito e Novos Caminhos */}
                <div>
                  <h3 className="font-sans font-bold text-[11px] md:text-[11.5px] uppercase tracking-[0.05em] text-[#631B26] mb-1.5 sm:mb-2 leading-snug">
                    Direito e Novos Caminhos
                  </h3>
                  <div className="space-y-2">
                    <p>
                      Graduanda em <strong>Direito pela UNIDERP</strong>, Mayara também atua no campo jurídico em demandas desenvolvidas pelo Instituto Novo Horizonte e no ambiente privado.
                    </p>
                    <p>
                      A formação jurídica se soma a uma trajetória construída entre gestão pública, política, instituições, negócios e impacto social, ampliando seu repertório para compreender estruturas e desenvolver projetos e soluções que atravessam diferentes setores.
                    </p>
                    <p>
                      Mais do que reunir experiências em áreas distintas, sua trajetória revela um fio comum:{' '}
                      <strong>
                        entender o cenário, construir direção, conectar quem precisa estar à mesa e transformar intenção em projetos capazes de acontecer.
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Atuação Atual */}
                <div>
                  <h3 className="font-sans font-bold text-[11px] md:text-[11.5px] uppercase tracking-[0.05em] text-[#631B26] mb-2 sm:mb-2.5 leading-snug">
                    Atuação Atual
                  </h3>
                  <div className="space-y-2 text-[12px] md:text-[12.5px] leading-tight">
                    <div>
                      <div className="font-bold text-[#1A1818]">Sócia e cofundadora</div>
                      <div className="text-[#3D3838]">Grupo Novo Horizonte®</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1818]">Direção Estratégica</div>
                      <div className="text-[#3D3838]">Mundial Business</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1818]">Fundadora</div>
                      <div className="text-[#3D3838]">Movimento RÁZGA®</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1818]">Vice-Presidente</div>
                      <div className="text-[#3D3838]">Instituto Novo Horizonte</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1818]">Presidente</div>
                      <div className="text-[#3D3838]">AMT/MS | PDT</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Signature Block */}
            <div className="pt-4 border-t border-[#1A1818]/15">
              <div className="font-serif font-bold text-lg sm:text-xl text-[#1A1818]">
                MAYARA BARROS
              </div>
              <div className="font-sans font-semibold text-xs sm:text-sm text-[#631B26] mt-0.5">
                Estrategista em Desenvolvimento Institucional e Projetos de Impacto
              </div>
              <div className="font-serif italic text-xs sm:text-sm text-[#1A1818] mt-1.5">
                Transformar intenção em direção. E direção em projetos que acontecem.
              </div>
            </div>
          </div>

          {/* Bottom Wine Strip */}
          <div className="w-full h-[14px] sm:h-[18px] bg-[#631B26] shrink-0" />
        </section>
      </main>
    </div>
  );
};
