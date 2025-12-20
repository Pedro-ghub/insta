import { getInstagramData } from "@/app/lib/instagram-data";
import Image from "next/image";
import Link from "next/link";
import MatrixBackground from "@/app/components/matrix-background";
import FAQAccordion from "@/app/components/faq-accordion";
import SaleTimer from "@/app/components/sale-timer";
import ScrollToPlansButton from "@/app/components/scroll-to-plans-button";
import InstagramLocation from "@/app/components/instagram-location";
import RestrictedStoryCard from "@/app/components/restricted-story-card";

interface PageParams {
  username?: string;
}

async function resolveParams(params: unknown): Promise<PageParams> {
  const resolved = await Promise.resolve(params as PageParams);
  return resolved || {};
}

async function getProfileData(username: string) {
  try {
    const data = await getInstagramData(username);
    return { data, error: "" };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao buscar dados do Instagram.";
    return { data: null, error: message };
  }
}

export default async function VendasPage({ params }: { params: PageParams | Promise<PageParams> }) {
  const resolved = await resolveParams(params);
  const username = resolved.username ?? "";

  if (!username) {
    return (
      <main className="min-h-screen bg-[#0b1014] text-white">
        <div className="mx-auto flex max-w-md flex-col">
          <div className="rounded-2xl border border-white/10 bg-rose-500/10 p-5 text-rose-100">
            <p className="text-lg font-semibold">Username não informado.</p>
            <p className="mt-2 text-sm text-rose-50/90">Acesse via /vendas/@usuario.</p>
          </div>
        </div>
      </main>
    );
  }

  const result = await getProfileData(username);
  if (!result.data) {
    return (
      <main className="min-h-screen bg-[#0b1014] text-white">
        <div className="mx-auto flex max-w-md flex-col">
          <div className="rounded-2xl border border-white/10 bg-rose-500/10 p-5 text-rose-100">
            <p className="text-lg font-semibold">Não foi possível carregar</p>
            <p className="mt-2 text-sm text-rose-50/90">{result.error}</p>
          </div>
        </div>
      </main>
    );
  }

  const profile = result.data.profile;

  function formatNumber(num: number | null | undefined): string {
    if (!num) return "0";
    return num.toLocaleString("pt-BR");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1014] text-white">
      <MatrixBackground />
      <SaleTimer />
      <div className="relative z-10 pt-16">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Logo e Tagline */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="StalkGram Logo"
                width={200}
                height={60}
                className="h-auto w-auto"
                priority
              />
            </div>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse-opacity">
              A maior ferramenta Stalker do Brasil
            </p>
          </div>

          {/* Seção de Acesso ao Perfil */}
          <div
            className="mb-12 rounded-3xl p-6 shadow-xl border backdrop-blur-lg"
            style={{
              background: "rgb(12, 16, 17)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(54, 54, 54, 0.2)",
            }}
          >
            <h1 className="text-xl md:text-3xl font-extrabold text-center mb-4 leading-tight">
              <span className="text-white">Acesso completo ao perfil de:</span>
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full p-[2px] shrink-0" style={{
                background: "linear-gradient(135deg, rgb(235, 28, 143) 0%, rgb(223, 179, 19) 100%)",
              }}>
                <div className="rounded-full p-[2px] bg-[#040607]">
                  <Image
                    src={profile.profilePicUrl}
                    alt={profile.username}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white mb-1">@{profile.username}</h2>
                <p className="text-sm text-gray-300 mb-2 truncate">
                  {profile.fullName || profile.username}
                </p>
                <div className="flex gap-4 text-xs">
                  <div>
                    <span className="font-bold text-white">{formatNumber(profile.postCount)}</span>
                    <span className="text-gray-400"> posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{formatNumber(profile.followerCount)}</span>
                    <span className="text-gray-400"> seguidores</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{formatNumber(profile.followingCount)}</span>
                    <span className="text-gray-400"> seguindo</span>
                  </div>
                </div>
              </div>
            </div>
            {profile.biography && (
              <p className="text-gray-300 text-xs mb-4 leading-relaxed line-clamp-2">
                {profile.biography}
              </p>
            )}
            <ScrollToPlansButton className="w-full bg-green-600 rounded-2xl p-4 hover:bg-green-700 transition cursor-pointer">
              <p className="text-center text-white text-sm font-semibold">
                Sem precisar de senha. Sem deixar rastros. Sem que a pessoa saiba.
              </p>
            </ScrollToPlansButton>
          </div>

          {/* Seta animada */}
          <div className="mb-12 flex justify-center">
            <div className="animate-bounce">
              <svg width="24" height="48" viewBox="0 0 24 48" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="0" x2="12" y2="36" />
                <path d="M6 30l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Features do StalkGram */}
          <div className="mb-12 space-y-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
              O que você terá acesso:
            </h2>

            {/* Feature 1: Mídias */}
            <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-2 rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Todas as mídias recebidas e enviadas por @{profile.username}
                </h3>
              </div>
              <p className="mb-4 text-sm text-white/70">
                Incluindo arquivos ocultos que não estão 'visíveis pra todos'.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${i}${profile.username}/400/400`}
                      alt="Mídia"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover blur-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 2: Localização */}
            <ScrollToPlansButton className="w-full rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm p-6 hover:bg-gray-900 transition cursor-pointer">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-2 rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Localização em tempo real de @{profile.username}
                </h3>
              </div>
              <p className="mb-4 text-sm text-white/70">
                Veja onde a pessoa está agora e por onde passou nas últimas horas.
              </p>

              {/* Elemento de localização do Instagram */}
              <div className="flex justify-center">
                <InstagramLocation
                  profilePicUrl={profile.profilePicUrl}
                  username={profile.username}
                  showBlur={false}
                  showLock={false}
                  showMaskedUsername={false}
                  renderAsDiv={true}
                />
              </div>
            </ScrollToPlansButton>

            {/* Feature 3: Stories e Posts Ocultos */}
            <div className="rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-2 rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Stories e posts ocultos</h3>
              </div>
              <p className="mb-2 text-sm text-white/70">
                Aqueles postados pra "Melhores Amigos" ou ocultados de você.
              </p>
              <p className="mb-4 text-sm font-semibold text-white/90">
                Você verá mesmo se o perfil for privado.
              </p>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                <RestrictedStoryCard
                  storyImage="/stories/story (1).png"
                  profilePicUrl={profile.profilePicUrl}
                  username={profile.username}
                  postedDate="10/12/2024"
                />
                <RestrictedStoryCard
                  storyImage="/stories/story (2).png"
                  profilePicUrl={profile.profilePicUrl}
                  username={profile.username}
                  postedDate="08/12/2024"
                />
                <RestrictedStoryCard
                  storyImage="/stories/story (3).png"
                  profilePicUrl={profile.profilePicUrl}
                  username={profile.username}
                  postedDate="05/12/2024"
                />
                <RestrictedStoryCard
                  storyImage="/stories/story (1).jpg"
                  profilePicUrl={profile.profilePicUrl}
                  username={profile.username}
                  postedDate="02/12/2024"
                />
              </div>
            </div>

            {/* Feature 4: Directs */}
            <div className="rounded-2xl border border-white/10 bg-gray-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-2 rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Mensagens privadas do Instagram (Directs)
                </h3>
              </div>
              <p className="mb-1 text-sm text-white">
                Veja o que @{profile.username} fala no privado.
              </p>
              <p className="mb-6 text-sm text-white">
                Conversas, fotos, vídeos, áudios, contatos... tudo.
              </p>

              {/* Primeiro Chat */}
              <div className="max-w-md mx-auto bg-black/30 rounded-3xl overflow-hidden border border-white/10 mb-4">
                {/* Header do Chat */}
                <div className="bg-[#0B1014] px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <button className="text-white/60" aria-label="Voltar">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <Image
                      alt="Chat"
                      src="/female_profile/fem_1.jpg"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm blur-sm select-none">l*****</p>
                      <p className="text-gray-400 text-xs">online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white" aria-label="Ligar">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="text-white" aria-label="Vídeo chamada">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Mensagens */}
                <div className="p-4 space-y-2 bg-[#0B1014]">
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div
                        className="rounded-2xl px-4 py-3 flex items-center gap-2"
                        style={{ background: 'rgb(58, 58, 60)' }}
                      >
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                        </svg>
                        <div className="flex flex-col">
                          <span className="text-white text-sm font-medium">Ligação de vídeo</span>
                          <span className="text-white/60 text-xs">
                            <span className="blur-sm select-none">••</span>:47
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-2xl px-4 py-3 max-w-[70%]"
                      style={{
                        background: 'linear-gradient(135deg, rgb(114, 33, 255) 0%, rgb(136, 19, 232) 100%)',
                        color: 'white',
                      }}
                    >
                      <div className="h-4 bg-white/20 rounded blur-sm" style={{ width: '140px' }} />
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div
                      className="rounded-2xl px-4 py-3 max-w-[70%]"
                      style={{
                        background: 'linear-gradient(135deg, rgb(114, 33, 255) 0%, rgb(136, 19, 232) 100%)',
                        color: 'white',
                      }}
                    >
                      <div className="h-4 bg-white/20 rounded blur-sm" style={{ width: '180px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Segundo Chat */}
              <div className="max-w-md mx-auto bg-black/30 rounded-3xl overflow-hidden border border-white/10">
                {/* Header do Chat */}
                <div className="bg-[#0B1014] px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <button className="text-white/60" aria-label="Voltar">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <Image
                      alt="Chat"
                      src="/male_profile/male_1.jpg"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm blur-sm select-none">m*****</p>
                      <p className="text-gray-400 text-xs">online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white" aria-label="Ligar">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="text-white" aria-label="Vídeo chamada">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Mensagens */}
                <div className="p-4 space-y-2 bg-[#0B1014]">
                  <div className="flex justify-start">
                    <div
                      className="rounded-2xl px-4 py-3 max-w-[70%]"
                      style={{ background: 'rgb(58, 58, 60)' }}
                    >
                      <p className="text-white text-sm blur-[5px]">oiii tá ai????</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-2xl px-4 py-3 max-w-[70%]"
                      style={{
                        background: 'linear-gradient(135deg, rgb(114, 33, 255) 0%, rgb(136, 19, 232) 100%)',
                        color: 'white',
                      }}
                    >
                      <p className="text-white text-sm blur-[5px]">simm e vc ta bem?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-2xl px-4 py-3 flex items-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, rgb(114, 33, 255) 0%, rgb(136, 19, 232) 100%)',
                        color: 'white',
                      }}
                    >
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">Ligação de voz</span>
                        <span className="text-white/60 text-xs">
                          <span className="blur-sm select-none">••</span>:32
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-2xl px-4 py-3 max-w-[70%]"
                      style={{
                        background: 'linear-gradient(135deg, rgb(114, 33, 255) 0%, rgb(136, 19, 232) 100%)',
                        color: 'white',
                      }}
                    >
                      <p className="text-white text-sm blur-[5px]">o que acha?</p>
                    </div>
                  </div>
                  <div className="flex justify-start mb-4">
                    <div
                      className="rounded-2xl px-4 py-3 max-w-[70%]"
                      style={{ background: 'rgb(58, 58, 60)' }}
                    >
                      <p className="text-white text-sm blur-[5px]">eitaa vc é gostoso mesmo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seta animada */}
          <div className="mb-12 flex justify-center">
            <div className="animate-bounce">
              <svg width="24" height="48" viewBox="0 0 24 48" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="0" x2="12" y2="36" />
                <path d="M6 30l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
              Veja o que falam as pessoas que usam o StalkGram:
            </h2>
            <div className="space-y-0 divide-y divide-white/10 rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm overflow-hidden">
              {[
                {
                  icon: "profile",
                  username: "maria_s****",
                  time: "3h",
                  text: "Eu tava desconfiando, mas não tinha certeza... Quando paguei a versão completa vi os directs e os stories escondidos fiquei sem chão. Mas pelo menos eu soube a verdade.",
                },
                {
                  icon: "lock",
                  username: "j*****",
                  time: "5h",
                  text: "Usei no insta de uma ficante minha vi que ele tava com outro há meses. A ferramenta me deu paz.",
                },
                {
                  icon: "profile",
                  username: "ana_c****",
                  time: "1d",
                  text: "Achei que era fake no começo. na versão completa eu testei com @ do boy e vi um monte de coisa kkkkk. Localização, fotos escondidas, até conversas apagadas.",
                },
                {
                  icon: "lock",
                  username: "p*****",
                  time: "5d",
                  text: "a função de ver a localização em tempo real é muito bom kkkkk",
                },
                {
                  icon: "blurred",
                  username: "l*****",
                  time: "3 sem",
                  text: "não vivo sem essa ferramenta, conheci ela uns meses atrás no tiktok e até hoje uso em alguns perfis que to desconfiado",
                },
                {
                  icon: "profile",
                  username: "c*****",
                  time: "2 sem",
                  text: "Não recomendo pra quem não quer ver a verdade.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="flex items-start gap-3 p-4 hover:bg-white/5 transition">
                  <div className="shrink-0">
                    {testimonial.icon === "profile" ? (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    ) : testimonial.icon === "lock" ? (
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center blur-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white blur-sm select-none">
                        {testimonial.username}
                      </span>
                      <span className="text-xs text-white/60">{testimonial.time}</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios */}
          <div
            className="rounded-3xl p-8 shadow-xl border backdrop-blur-lg relative overflow-hidden mb-12"
            style={{
              background: 'rgb(12, 16, 17)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(54, 54, 54, 0.2)',
            }}
          >
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{
                  animation: 'shine 3s ease infinite',
                  transform: 'translateX(-100%)',
                }}
              />
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 md:w-32 md:h-32">
                <Image
                  alt="StalkGram Logo"
                  src="/images/logo.png"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Título */}
            <h2 className="text-xl md:text-2xl font-bold text-center mb-3 leading-tight text-white">
              Além do acesso ao perfil de{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, rgb(235, 28, 143) 0%, rgb(223, 179, 19) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                @{profile.username}
              </span>{' '}
              você poderá ter acesso a ferramenta do{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, rgb(235, 28, 143) 0%, rgb(223, 179, 19) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                StalkGram
              </span>
            </h2>

            {/* Descrição */}
            <p className="text-gray-300 text-center mb-6 text-lg md:text-base">
              De forma completa e vitalícia, ou seja, stalkear quantos perfis quiser, quando quiser pra sempre.
            </p>

            {/* Lista de benefícios */}
            <div className="space-y-3 mb-12 mt-12">
              <div className="flex items-start gap-3 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm md:text-base">Espionar quantos perfis quiser.</span>
              </div>
              <div className="flex items-start gap-3 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-sm md:text-base">Visualizar todos os dados com apenas um clique.</span>
              </div>
              <div className="flex items-start gap-3 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm md:text-base">Ter acesso vitalício sem pagar mensalidade.</span>
              </div>
              <div className="flex items-start gap-3 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <span className="text-sm md:text-base">Sem instalar nada, serviço funciona na nuvem.</span>
              </div>
            </div>

            {/* Banner de aviso */}
            <div
              className="rounded-2xl pt-4 pb-4 pr-3 pl-3 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgb(220, 38, 38) 0%, rgb(185, 28, 28) 100%)',
                boxShadow: 'rgba(220, 38, 38, 0.3) 0px 10px 40px',
              }}
            >
              <div className="relative z-10">
                <p className="text-white font-bold text-sm mb-2">SEM O STALKGRAM, VOCÊ NÃO VÊ NADA</p>
                <p className="text-white/90 text-sm">
                  É ele quem desbloqueia os dados de @{profile.username} de forma invisível
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
            </div>
          </div>

          {/* Controle de Perfis */}
          <div className="mb-12 rounded-2xl border border-white/10 bg-gray-900 p-6">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">
              Tenha o controle de qualquer perfil em suas mãos!
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <p className="text-white">Descobrir uma traição antes de ser feita de trouxa</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-white">Espionar quem você ama em silêncio</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <circle cx="9" cy="9" r="1" />
                    <circle cx="15" cy="9" r="1" />
                    <circle cx="12" cy="9" r="1" />
                  </svg>
                </div>
                <p className="text-white">Ver se alguém tá falando mal de você pelas costas</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <p className="text-white">Proteger sua família, sua relação, sua paz</p>
              </div>
            </div>
          </div>

          {/* Banner de Aviso */}
          <div
            className="mb-12 rounded-2xl pt-4 pb-4 pr-3 pl-3 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgb(220, 38, 38) 0%, rgb(185, 28, 28) 100%)',
              boxShadow: 'rgba(220, 38, 38, 0.3) 0px 10px 40px',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-white font-bold text-sm">ATENÇÃO: Use com discernimento.</p>
              </div>
              <p className="text-white/90 text-xs">
                Não nos responsabilizamos por nada que você fizer. Utilize com responsabilidade.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
          </div>

          {/* Planos */}
          <div id="planos" className="mb-12">
            <div className="mb-6 mx-auto max-w-xs rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 p-2.5 text-center animate-pulse-opacity">
              <p className="text-sm font-bold text-white">PROMOÇÃO FIM DE ANO - LIMITADA</p>
            </div>
            <h2 className="mb-2 text-center text-3xl font-bold text-white">ESCOLHA SEU PLANO</h2>
            <p className="mb-8 text-center text-sm text-white/60">POR TEMPO LIMITADO</p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Plano 1 */}
              <div className="group relative rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900 to-gray-800 p-5 shadow-2xl transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/20">
                <div className="mb-4">
                  <div className="mb-1.5 inline-block rounded-full bg-pink-500/20 px-2.5 py-0.5">
                    <p className="text-[10px] font-semibold text-pink-400">Plano Básico</p>
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-white">Acesso ao Perfil</h3>
                  <p className="text-xs text-white/60">Tudo que você precisa para descobrir a verdade sobre @{profile.username}</p>
                </div>

                <div className="mb-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-3 border border-pink-500/20">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xs text-white/50 line-through">R$ 109,90</p>
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">R$ 49,90</p>
                  </div>
                  <p className="mt-0.5 text-[10px] text-green-400 font-semibold">Economia de R$ 60,00</p>
                  <p className="mt-1 text-[10px] text-white/50">Menos de R$ 2,00 por dia</p>
                </div>

                <ul className="mb-4 space-y-1.5">
                  {[
                    "Acesso oculto de 8 mídias",
                    "Stories ocultos",
                    "Directs em tempo real",
                    "Localização em tempo real",
                    "Acesso a mídias (fotos e vídeos)",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-0.5 shrink-0 rounded-full bg-green-500/20 p-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-xs text-white/90 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://checkout.perfectpay.com.br/pay/PPU38CQ4LNT?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40"
                  suppressHydrationWarning
                >
                  ESCOLHER PLANO
                </a>
                <p className="mt-2 text-center text-[10px] text-white/50">💳 Pagamento 100% seguro</p>
              </div>

              {/* Plano 2 - Mais Escolhido */}
              <div className="group relative rounded-2xl border-2 border-transparent bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 p-5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/30 backdrop-blur-sm">
                {/* Camada de gradiente colorido por cima */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/40 via-orange-500/40 to-yellow-500/40 pointer-events-none"></div>
                {/* Badge Mais Escolhido */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                  <div className="rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 px-4 py-1 shadow-lg">
                    <p className="text-[10px] font-bold text-white flex items-center gap-1">
                      <span>⭐</span> MAIS ESCOLHIDO
                    </p>
                  </div>
                </div>

                {/* Efeito de brilho sutil */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                <div className="relative z-20">
                  <div className="mb-4">
                    <div className="mb-1.5 inline-block rounded-full bg-gradient-to-r from-pink-500/30 to-yellow-500/30 px-2.5 py-0.5 border border-pink-500/50">
                      <p className="text-[10px] font-semibold text-yellow-300">Plano Completo</p>
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-white">
                      Acesso Completo + Ferramenta Vitalícia
                    </h3>
                    <p className="text-xs text-white/70">Tudo do perfil de @{profile.username} + ferramenta ilimitada para sempre</p>
                  </div>

                  <div className="mb-4 rounded-xl bg-gradient-to-r from-pink-500/20 via-orange-500/20 to-yellow-500/20 p-3 border-2 border-pink-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer-bg"></div>
                    <div className="relative">
                      <div className="flex items-baseline gap-2">
                        <p className="text-xs text-white/50 line-through">R$ 274,90</p>
                        <p className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">R$ 59,90</p>
                      </div>
                      <p className="mt-0.5 text-[10px] text-green-400 font-bold">Economia de R$ 215,00</p>
                      <p className="mt-1 text-[10px] text-yellow-300 font-semibold">Menos de uma xícara de café por dia - Acesso Vitalício</p>
                    </div>
                  </div>

                  <ul className="mb-4 space-y-1.5">
                    {[
                      "Acesso oculto de 8 mídias",
                      "Stories ocultos",
                      "Directs em tempo real",
                      "Localização em tempo real",
                      "Acesso a mídias (fotos e vídeos)",
                      "Notificações em tempo real",
                      "Relatório detalhado",
                      "Espionar quantos perfis quiser (ILIMITADO)",
                      "Acesso vitalício",
                      "Sem mensalidades",
                      "Localizações antigas e relatório de locais",
                      "Limpar rastros (em 10 meses úteis)",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-pink-500/30 to-yellow-500/30 p-0.5 border border-pink-500/50">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="yellow" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-xs text-white/90 leading-tight font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://checkout.perfectpay.com.br/pay/PPU38CQ4LNJ?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full rounded-lg bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 px-4 py-2.5 text-center text-sm font-bold text-white shadow-2xl shadow-pink-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/60 overflow-hidden group/btn"
                    suppressHydrationWarning
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      ESCOLHER PLANO
                    </span>
                  </a>

                  <div className="mt-2 flex items-center justify-center gap-3 text-[10px]">
                    <p className="text-white/50">💳 Pagamento seguro</p>
                    <span className="text-white/30">•</span>
                    <p className="text-green-400 font-semibold">🛡️ Garantia de 30 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Garantia */}
          <div className="mb-12 rounded-2xl border border-green-500 bg-green-500/10 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Garantia de 30 Dias</h3>
            <p className="text-sm text-white/80">
              Teste sem riscos! Se não gostar, devolvemos 100% do seu dinheiro.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Perguntas Frequentes</h2>
            <FAQAccordion
              items={[
                {
                  question: "A ferramenta realmente funciona?",
                  answer: "Sim! Nossa ferramenta acessa dados públicos e privados de perfis do Instagram de forma 100% invisível. Milhares de pessoas já usaram e descobriram a verdade.",
                },
                {
                  question: "A pessoa vai saber que eu stalkeei o perfil dela?",
                  answer: "Não! Nosso sistema é completamente invisível. Não deixamos rastros e a pessoa nunca vai saber que você viu o perfil dela.",
                },
                {
                  question: "Funciona em perfis privados?",
                  answer: "Sim! Nossa tecnologia consegue acessar informações de perfis privados, incluindo stories ocultos, mensagens e localização.",
                },
                {
                  question: "Preciso instalar alguma coisa?",
                  answer: "Não! A ferramenta funciona 100% na nuvem. Você só precisa ter acesso à internet e pode usar de qualquer dispositivo.",
                },
                {
                  question: "Como funciona a garantia?",
                  answer: "Você tem 30 dias para testar. Se não gostar, devolvemos 100% do seu dinheiro sem perguntas.",
                },
                {
                  question: "Quanto tempo terei acesso?",
                  answer: "Com o Plano StalkGram, você tem acesso VITALÍCIO! Pague uma vez e use para sempre, sem mensalidades.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

