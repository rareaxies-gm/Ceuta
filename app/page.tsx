"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";

type Tweet = {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
  views: number;
  avatarUrl: string;
  tweetUrl: string;
};

type TierKey = "S" | "A" | "B" | "C" | "D" | "E" | "DISCARD";
type VisibleTier = "S" | "A" | "B" | "C" | "D" | "E";

const TWEETS: Tweet[] = [
  {
    id: "2083297880933011461",
    author: "Dr. Maalouf",
    handle: "@realMaalouf",
    content:
      "A Moroccan migrant decided to go back to Morocco because he didn’t find Spain good enough for him 🤣",
    likes: 12000,
    reposts: 2300,
    views: 1000000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1771658176200318976/zppeMEGD_400x400.jpg",
    tweetUrl: "https://x.com/realMaalouf/status/2083297880933011461",
  },
  {
    id: "2082911773469127065",
    author: "Collin Rugg",
    handle: "@CollinRugg",
    content:
      "Spain is now deploying its military after thousands of military-aged men stormed over the border into Ceuta, Spain.",
    likes: 22000,
    reposts: 6100,
    views: 11900000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1325087660428447746/4DL2iq76_400x400.jpg",
    tweetUrl: "https://x.com/CollinRugg/status/2082911773469127065",
  },
  {
    id: "2083556377641812287",
    author: "HJB News",
    handle: "@HJB_News__",
    content: "Newly arrived African migrant culturally enriches locals in Spain.",
    likes: 30000,
    reposts: 13000,
    views: 840500,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2006926965429723136/nuuCSsTe_400x400.jpg",
    tweetUrl: "https://x.com/HJB_News__/status/2083556377641812287",
  },
  {
    id: "2083217680467722597",
    author: "Visegrád 24",
    handle: "@visegrad24",
    content: "In Ceuta, Moroccan migrants are attacking cars of local residents.",
    likes: 2500,
    reposts: 780,
    views: 332700,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1875625827674591232/OBzjRIZ4_400x400.jpg",
    tweetUrl: "https://x.com/visegrad24/status/2083217680467722597",
  },
  {
    id: "2083621662956634208",
    author: "The Nowhere Photographer",
    handle: "@thenowherephoto",
    content: "Ceuta tonight is pushing back",
    likes: 3900,
    reposts: 626,
    views: 52900,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2034539483933151232/iWZrDqRf_400x400.jpg",
    tweetUrl: "https://x.com/thenowherephoto/status/2083621662956634208",
  },
  {
    id: "2083223177811959879",
    author: "Dani Lerer",
    handle: "@danilerer",
    content: "In just a few hours, this is what they did to Ceuta.",
    likes: 2500,
    reposts: 981,
    views: 1900000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2061932457075539968/mOHy-TT2_400x400.jpg",
    tweetUrl: "https://x.com/danilerer/status/2083223177811959879",
  },
  {
    id: "2084168424016548241",
    author: "RagingDissident_",
    handle: "@JustRaging01",
    content: "White shitlib hides invaders in her cafe, what a spanner.",
    likes: 93,
    reposts: 33,
    views: 1344,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2064936232769994752/ywXDRKGr_400x400.jpg",
    tweetUrl: "https://x.com/JustRaging01/status/2084168424016548241",
  },
  {
    id: "2083168454350090740",
    author: "Matt Van Swol",
    handle: "@mattvanswol",
    content: "Police are completely overwhelmed.",
    likes: 94000,
    reposts: 30000,
    views: 8400000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1580221131985920001/XNlqL_Yx_400x400.jpg",
    tweetUrl: "https://x.com/mattvanswol/status/2083168454350090740",
  },
  {
    id: "2083281507834110009",
    author: "David Santos",
    handle: "@davidsantosvlog",
    content: "Illegal Moroccans fight among themselves in Ceuta.",
    likes: 1400,
    reposts: 560,
    views: 600000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1728348204662403072/ZXRMcVJ7_400x400.jpg",
    tweetUrl: "https://x.com/davidsantosvlog/status/2083281507834110009",
  },
  {
    id: "2084658894186352769",
    author: "Canario Today",
    handle: "@CanarioToday",
    content: "Today's transfer of illegal immigrants from Ceuta to Andalusia.",
    likes: 8200,
    reposts: 5800,
    views: 1400000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1890482954226270208/uPDmpS0-_400x400.jpg",
    tweetUrl: "https://x.com/CanarioToday/status/2084658894186352769",
  },
  {
    id: "2083620227850371536",
    author: "Inevitable West",
    handle: "@Inevitablewest",
    content: "Locals in Ceuta are doing a better job catching illegals than the police.",
    likes: 3500,
    reposts: 529,
    views: 52400,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1849508889718312960/cuJBcI8u_400x400.jpg",
    tweetUrl: "https://x.com/Inevitablewest/status/2083620227850371536",
  },
  {
    id: "2083111715755995400",
    author: "Europa",
    handle: "@europa",
    content: "Ceuta residents are now patrolling the streets themselves.",
    likes: 910,
    reposts: 121,
    views: 167800,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1987881780796444672/6jVJlJZ2_400x400.jpg",
    tweetUrl: "https://x.com/europa/status/2083111715755995400",
  },
  {
    id: "2084682236364742868",
    author: "🅲🅾🆇🆇",
    handle: "@queru_lant",
    content: "Pandora's box has been opened.",
    likes: 14000,
    reposts: 5400,
    views: 1000000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1628427250864455680/difDIVPC_400x400.jpg",
    tweetUrl: "https://x.com/queru_lant/status/2084682236364742868",
  },
  {
    id: "2083205988249641240",
    author: "Wall Street Wolverine",
    handle: "@wallstwolverine",
    content: "“If they deport us, we’re going to come back.”",
    likes: 1600,
    reposts: 387,
    views: 358000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1733980849383620608/2NrD0H81_400x400.jpg",
    tweetUrl: "https://x.com/wallstwolverine/status/2083205988249641240",
  },
  {
    id: "2083943113106579956",
    author: "Dr. Maalouf",
    handle: "@realMaalouf",
    content:
      "In Spain, a Moroccan migrant attempted to rob a Chinese tourist, but he picked the wrong one!",
    likes: 47000,
    reposts: 4900,
    views: 2000000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1771658176200318976/zppeMEGD_400x400.jpg",
    tweetUrl: "https://x.com/realMaalouf/status/2083943113106579956",
  },
  {
    id: "2083333856531263663",
    author: "Matt Van Swol",
    handle: "@mattvanswol",
    content: "A Muslim invader stabs a local in the neck",
    likes: 58000,
    reposts: 17000,
    views: 5700000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1580221131985920001/XNlqL_Yx_400x400.jpg",
    tweetUrl: "https://x.com/mattvanswol/status/2083333856531263663",
  },
  {
    id: "2083797626709786627",
    author: "RagingDissident_",
    handle: "@JustRaging01",
    content: "Moroccans are realising the consequences of looting every store in sight",
    likes: 215,
    reposts: 73,
    views: 15100,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2064936232769994752/ywXDRKGr_400x400.jpg",
    tweetUrl: "https://x.com/JustRaging01/status/2083797626709786627",
  },
  {
    id: "2082805062305259736",
    author: "Visegrád 24",
    handle: "@visegrad24",
    content:
      "A huge crowd of illegal migrants is moving towards the border with the Spanish enclave of Ceuta.",
    likes: 2700,
    reposts: 1100,
    views: 623200,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1875625827674591232/OBzjRIZ4_400x400.jpg",
    tweetUrl: "https://x.com/visegrad24/status/2082805062305259736",
  },
  {
    id: "2083980882843406462",
    author: "Martin Sellner",
    handle: "@MartinSellner_",
    content: "Live from Ceuta: Massive migrant breakthrough.",
    likes: 4900,
    reposts: 1400,
    views: 438500,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1854031937888759824/h85Xoahf_400x400.jpg",
    tweetUrl: "https://x.com/MartinSellner_/status/2083980882843406462",
  },
  {
    id: "2094543440524591157",
    author: "Concerned Citizen",
    handle: "@BGatesIsaPyscho",
    content:
      "Remember when Legacy Media told you all the invaders simply went back to Morocco after a day?",
    likes: 4800,
    reposts: 2200,
    views: 134300,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1534905804368879621/R5xYZeL5_400x400.jpg",
    tweetUrl: "https://x.com/BGatesIsaPyscho/status/2094543440524591157",
  },
  {
    id: "2094743054825427103",
    author: "Basil the Great",
    handle: "@BasilTheGreat",
    content: "The Spanish Authorities lies when they said the migrants all went hom",
    likes: 1800,
    reposts: 5000,
    views: 69100,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1870853024798715904/f7G0cKa9_400x400.jpg",
    tweetUrl: "https://x.com/BasilTheGreat/status/2094743054825427103",
  },
  {
    id: "2093084679339459021",
    author: "𝐂𝐚𝐬𝐮𝐚𝐥 𝐔𝐥𝐭𝐫𝐚 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥",
    handle: "@thecasualultra",
    content: "Groups of local men move against African migrants.",
    likes: 27000,
    reposts: 2500,
    views: 1400000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1643709302077550592/rlaeETA2_400x400.jpg",
    tweetUrl: "https://x.com/thecasualultra/status/2093084679339459021",
  },
  {
    id: "2093048377239810422",
    author: "Damien Rieu",
    handle: "@DamienRieu",
    content: "Spaniards burned a camp for migrants in Ceuta, Spain.",
    likes: 9300,
    reposts: 1200,
    views: 1100000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2056859032569204736/-TMGy8S4_400x400.jpg",
    tweetUrl: "https://x.com/DamienRieu/status/2093048377239810422",
  },
  {
    id: "2092552910496309303",
    author: "EDATV",
    handle: "@edatvoficial",
    content: "If parents leave a girl alone, it's normal for her to be raped.",
    likes: 3900,
    reposts: 1400,
    views: 3600000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1941259541636620288/U1le7Tar_400x400.jpg",
    tweetUrl: "https://x.com/edatvoficial/status/2092552910496309303",
  },
  {
    id: "2083190245831397413",
    author: "Clash Report",
    handle: "@clashreport",
    content: "Terrified Ceuta woman pleads for troops",
    likes: 643,
    reposts: 175,
    views: 802000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1942576646457868288/gOMYVVRf_400x400.jpg",
    tweetUrl: "https://x.com/clashreport/status/2083190245831397413",
  },
  {
    id: "2092198354994282737",
    author: "RadioGenoa",
    handle: "@RadioGenoa",
    content: "The Red Cross in Ceuta continues to bring food to North African criminals.",
    likes: 4800,
    reposts: 1700,
    views: 563000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1925910917482426368/vXAnSPXI_400x400.jpg",
    tweetUrl: "https://x.com/RadioGenoa/status/2092198354994282737",
  },
  {
    id: "2091246198917071289",
    author: "The media SOI",
    handle: "@MediaSOI",
    content: "The immigrants in Spain seem friendly",
    likes: 1500,
    reposts: 564,
    views: 60600,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI_400x400.jpg",
    tweetUrl: "https://x.com/MediaSOI/status/2091246198917071289",
  },
  {
    id: "2090742433881391423",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareRestore",
    content:
      "In Ceuta, a Spanish lady drags her daughter into a crowd of African men and starts a chant for Palestine.",
    likes: 15,
    reposts: 3,
    views: 2463,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareRestore/status/2090742433881391423",
  },
  {
    id: "2099972017336287459",
    author: "Rafael Sereti",
    handle: "@RafaelSereti",
    content: "Mbappé and Vinicius hide the slogan",
    likes: 245,
    reposts: 64,
    views: 3500000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1977790841419706368/Nar2RLAi_400x400.jpg",
    tweetUrl: "https://x.com/RafaelSereti/status/2099972017336287459",
  },
  {
    id: "2099946507692646611",
    author: "GxdCabrxn",
    handle: "@GxdCabron",
    content: "Vinicius telling Mbappé how to put on his jersey..",
    likes: 8100,
    reposts: 1100,
    views: 3300000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2100029083329363969/hV6mXOBF_400x400.jpg",
    tweetUrl: "https://x.com/GxdCabron/status/2099946507692646611",
  },
  {
    id: "2099947808300081342",
    author: "•",
    handle: "@yipikayei7",
    content: "Two ungrateful pricks.",
    likes: 31000,
    reposts: 4800,
    views: 1800000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2056455424442761216/in4gnaSe_400x400.jpg",
    tweetUrl: "https://x.com/yipikayei7/status/2099947808300081342",
  },
  {
    id: "2099955156443951360",
    author: "Pablø",
    handle: "@pablonost",
    content:
      "As a Madridista, I earnestly ask the Atlético de Madrid fans to whistle at these two shameless scoundrels every time they touch the ball on Sunday.",
    likes: 28000,
    reposts: 3400,
    views: 1000000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2085712565397581824/OKUlzn8U_400x400.jpg",
    tweetUrl: "https://x.com/pablonost/status/2099955156443951360",
  },
  {
    id: "2099945254505845041",
    author: "Laliga News",
    handle: "@laligaa_neews",
    content:
      "Kylian Mbappé and Vinicius Junior the only players not wearing the shirt in support of Ceuta.",
    likes: 1500,
    reposts: 388,
    views: 852000,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/2013546454321664000/ZGVUyS4T_400x400.jpg",
    tweetUrl: "https://x.com/laligaa_neews/status/2099945254505845041",
  },
];

const byId = Object.fromEntries(TWEETS.map((t) => [t.id, t]));

function pick(ids: string[]): Tweet[] {
  return ids.map((id) => byId[id]).filter(Boolean);
}

const VISIBLE_TIERS: VisibleTier[] = ["S", "A", "B", "C", "D", "E"];
const ALL_TIERS: TierKey[] = [...VISIBLE_TIERS, "DISCARD"];

const DEFAULT_TIER_LISTS: Record<TierKey, Tweet[]> = {
  S: pick([
    "2099972017336287459",
    "2099946507692646611",
    "2099947808300081342",
    "2099955156443951360",
    "2099945254505845041",
  ]),
  A: pick([
    "2083621662956634208",
    "2083620227850371536",
    "2083111715755995400",
    "2083943113106579956",
    "2093084679339459021",
    "2093048377239810422",
  ]),
  B: pick([
    "2082911773469127065",
    "2084658894186352769",
    "2084682236364742868",
    "2083205988249641240",
    "2082805062305259736",
    "2083980882843406462",
    "2094543440524591157",
    "2094743054825427103",
    "2083190245831397413",
  ]),
  C: pick([
    "2083217680467722597",
    "2083168454350090740",
    "2083281507834110009",
    "2083333856531263663",
    "2083797626709786627",
    "2092552910496309303",
  ]),
  D: pick([
    "2083297880933011461",
    "2083556377641812287",
    "2083223177811959879",
    "2091246198917071289",
  ]),
  E: pick([
    "2084168424016548241",
    "2092198354994282737",
    "2090742433881391423",
  ]),
  DISCARD: [],
};

const DEFAULT_TITLES: Record<TierKey, string> = {
  S: "African Footballers Stand with Rapists",
  A: "Spanish Patriots",
  B: "Not An Invasion",
  C: "Criminality",
  D: "Cultural Enrichment",
  E: "Suicidal Empathy",
  DISCARD: "Discard Pile",
};

const TIER_CLASSES: Record<TierKey, string> = {
  S: "bg-red-950/40 border-red-600",
  A: "bg-orange-950/40 border-orange-500",
  B: "bg-yellow-950/30 border-yellow-500",
  C: "bg-green-950/30 border-green-500",
  D: "bg-blue-950/30 border-blue-500",
  E: "bg-purple-950/30 border-purple-500",
  DISCARD: "bg-gray-900/60 border-gray-500",
};

const TIER_COLORS: Record<TierKey, string> = {
  S: "#dc2626",
  A: "#f97316",
  B: "#eab308",
  C: "#22c55e",
  D: "#3b82f6",
  E: "#a855f7",
  DISCARD: "#6b7280",
};

const LIVE_URL = "https://ceuta-madness.vercel.app/";
const DEFAULT_PROFILE =
  "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

function encodeState(
  tierLists: Record<TierKey, Tweet[]>,
  tierTitles: Record<TierKey, string>
) {
  return btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify({
          t: Object.fromEntries(
            Object.entries(tierLists).map(([key, tweets]) => [
              key,
              tweets.map((tweet) => tweet.id),
            ])
          ),
          titles: tierTitles,
        })
      )
    )
  );
}

function decodeState(raw: string): {
  tierLists: Record<TierKey, Tweet[]>;
  tierTitles: Record<TierKey, string>;
} | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(raw))));
    const tierLists: Record<TierKey, Tweet[]> = {
      S: [],
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      DISCARD: [],
    };
    for (const key of ALL_TIERS) {
      const ids: string[] = parsed.t?.[key] || [];
      tierLists[key] = ids.map((id) => byId[id]).filter(Boolean);
    }
    return {
      tierLists,
      tierTitles: { ...DEFAULT_TITLES, ...parsed.titles },
    };
  } catch {
    return null;
  }
}

function isDefaultState(
  tierLists: Record<TierKey, Tweet[]>,
  tierTitles: Record<TierKey, string>
) {
  for (const key of VISIBLE_TIERS) {
    if (tierTitles[key] !== DEFAULT_TITLES[key]) return false;
    if (
      tierLists[key].map((t) => t.id).join(",") !==
      DEFAULT_TIER_LISTS[key].map((t) => t.id).join(",")
    ) {
      return false;
    }
  }
  return tierLists.DISCARD.length === 0;
}

function TierBoard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tierLists, setTierLists] = useState(DEFAULT_TIER_LISTS);
  const [tierTitles, setTierTitles] = useState(DEFAULT_TITLES);
  const [editing, setEditing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [editingTitle, setEditingTitle] = useState<TierKey | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fromSharedLink, setFromSharedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const shareRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const raw = searchParams.get("s");
    if (!raw) return;
    const decoded = decodeState(raw);
    if (decoded) {
      setTierLists(decoded.tierLists);
      setTierTitles(decoded.tierTitles);
      setFromSharedLink(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!dragging) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    const onDragOver = (event: DragEvent) => {
      const y = event.clientY;
      const height = window.innerHeight;
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      if (y < 100) {
        autoScrollRef.current = setInterval(() => window.scrollBy(0, -12), 16);
      } else if (y > height - 100) {
        autoScrollRef.current = setInterval(() => window.scrollBy(0, 12), 16);
      }
    };

    const stop = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };

    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragend", stop);
    window.addEventListener("drop", stop);
    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragend", stop);
      window.removeEventListener("drop", stop);
      stop();
    };
  }, [dragging]);

  const allowDrop = (event: React.DragEvent) => {
    if (editing) event.preventDefault();
  };

  const onDrop = (event: React.DragEvent, toTier: TierKey) => {
    event.preventDefault();
    setDragging(false);
    if (!editing) return;
    const tweet: Tweet = JSON.parse(event.dataTransfer.getData("tweet"));
    const fromTier = event.dataTransfer.getData("fromTier") as TierKey;
    if (fromTier === toTier) return;
    setTierLists((prev) => ({
      ...prev,
      [fromTier]: prev[fromTier].filter((item) => item.id !== tweet.id),
      [toTier]: [...prev[toTier], tweet],
    }));
  };

  const discardTweet = (fromTier: TierKey, tweet: Tweet) => {
    if (!editing) return;
    setTierLists((prev) => ({
      ...prev,
      [fromTier]: prev[fromTier].filter((item) => item.id !== tweet.id),
      DISCARD: [...prev.DISCARD, tweet],
    }));
  };

  const scrollTier = (tier: TierKey, direction: "left" | "right") => {
    const node = scrollRefs.current[tier];
    node?.scrollBy({ left: direction === "right" ? 280 : -280, behavior: "smooth" });
  };

  const shareImage = async () => {
    if (editing) {
      setEditing(false);
      setEditingTitle(null);
    }
    if (!shareRef.current) return;
    setGenerating(true);
    try {
      const dataUrl = await toPng(shareRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#000000",
      });
      const link = document.createElement("a");
      link.download = "ceuta-madness.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Download failed — try again");
    } finally {
      setGenerating(false);
    }
  };

  const shareLink = async () => {
    if (editing) {
      setEditing(false);
      setEditingTitle(null);
    }
    const url = isDefaultState(tierLists, tierTitles)
      ? LIVE_URL
      : `${window.location.origin}/?s=${encodeState(tierLists, tierTitles)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedMessage("Link copied to clipboard!");
      setTimeout(() => setCopiedMessage(null), 3000);
    } catch {
      prompt("Copy this link:", url);
    }
  };

  const viewOriginal = () => {
    setTierLists(DEFAULT_TIER_LISTS);
    setTierTitles(DEFAULT_TITLES);
    setEditing(false);
    setFromSharedLink(false);
    setEditingTitle(null);
    router.push("/");
  };

  const visibleKeys = editing ? ALL_TIERS : VISIBLE_TIERS;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            🇪🇸 Ceuta Madness 🇪🇸
          </h1>
          <p className="text-gray-400 mb-6">
            💥 Carnage at the Spain-Morocco Border 💥
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setEditing((value) => !value);
                setEditingTitle(null);
              }}
              className="px-5 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ backgroundColor: TIER_COLORS.A }}
            >
              {editing ? "Finish editing ✅" : "Edit this list 🔧"}
            </button>
            <button
              onClick={shareImage}
              disabled={generating}
              className="px-5 py-3 rounded-xl font-semibold text-black transition-all disabled:opacity-50"
              style={{ backgroundColor: TIER_COLORS.B }}
            >
              {generating
                ? "Generating…"
                : editing
                  ? "Finish and Share 📸"
                  : "Share 📸"}
            </button>
            <button
              onClick={shareLink}
              className="px-5 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ backgroundColor: TIER_COLORS.C }}
            >
              {editing ? "Finish and Share 🔗" : "Share 🔗"}
            </button>
            {fromSharedLink && (
              <button
                onClick={viewOriginal}
                className="px-5 py-3 rounded-xl font-semibold text-white transition-all"
                style={{ backgroundColor: TIER_COLORS.D }}
              >
                View original
              </button>
            )}
          </div>
          {copiedMessage && (
            <p className="mt-4 text-sm text-green-400 font-medium">{copiedMessage}</p>
          )}
          {editing && (
            <p className="mt-4 text-sm text-yellow-400">
              Editing mode — drag cards, click titles to rename, or use ✕ to discard
            </p>
          )}
        </div>

        <div className="space-y-5">
          {visibleKeys.map((tier) => (
            <div
              key={tier}
              onDrop={(event) => onDrop(event, tier)}
              onDragOver={allowDrop}
              className={`border-l-8 rounded-2xl p-4 transition-all ${TIER_CLASSES[tier]} ${
                editing ? "ring-2 ring-white/20" : ""
              }`}
            >
              <div className="flex items-center gap-5 mb-4">
                <div className="text-6xl font-black leading-none w-16 flex-shrink-0 flex items-center justify-center">
                  {tier === "DISCARD" ? "🗑️" : tier}
                </div>
                <div className="flex-1 min-w-0">
                  {editing && editingTitle === tier && tier !== "DISCARD" ? (
                    <input
                      autoFocus
                      value={tierTitles[tier]}
                      onChange={(event) =>
                        setTierTitles((prev) => ({
                          ...prev,
                          [tier]: event.target.value,
                        }))
                      }
                      onBlur={() => setEditingTitle(null)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setEditingTitle(null);
                      }}
                      className="w-full bg-black/40 border border-white/30 rounded-lg px-3 py-2 text-xl font-semibold text-white focus:outline-none focus:border-white"
                      maxLength={40}
                    />
                  ) : (
                    <div
                      onClick={() =>
                        editing && tier !== "DISCARD" && setEditingTitle(tier)
                      }
                      className={`text-xl font-semibold truncate ${
                        editing && tier !== "DISCARD"
                          ? "cursor-pointer hover:text-white/80 border-b border-dashed border-white/30 pb-0.5"
                          : ""
                      }`}
                    >
                      {tierTitles[tier] || "Untitled"}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative min-w-0">
                {tierLists[tier].length > 3 && (
                  <button
                    onClick={() => scrollTier(tier, "left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white text-xl"
                  >
                    ‹
                  </button>
                )}
                <div
                  ref={(node) => {
                    scrollRefs.current[tier] = node;
                  }}
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-1"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {tierLists[tier].map((tweet) => (
                    <div
                      key={tweet.id}
                      draggable={editing}
                      onDragStart={(event) => {
                        event.dataTransfer.setData("tweet", JSON.stringify(tweet));
                        event.dataTransfer.setData("fromTier", tier);
                        setDragging(true);
                      }}
                      onDragEnd={() => setDragging(false)}
                      className={`relative bg-[#1f2429] border border-[#2f3336] rounded-xl p-4 w-60 flex-shrink-0 ${
                        editing ? "cursor-grab active:cursor-grabbing" : ""
                      }`}
                    >
                      {editing && (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            discardTweet(tier, tweet);
                          }}
                          className="absolute top-2 right-2 z-10 w-7 h-7 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                          title="Move to Discard Pile"
                        >
                          ✕
                        </button>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={tweet.avatarUrl}
                          alt={tweet.author}
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0 bg-gray-700"
                          onError={(event) => {
                            event.currentTarget.src = DEFAULT_PROFILE;
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate">
                            {tweet.author}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {tweet.handle}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-200 line-clamp-3 mb-3 whitespace-pre-line">
                        {tweet.content}
                      </p>
                      <img
                        src={`/images/${tweet.id}.png`}
                        alt="Evidence"
                        className="w-full aspect-square object-cover rounded-lg mb-3 bg-gray-800"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex gap-3 text-gray-500">
                          <span>❤️ {tweet.likes.toLocaleString()}</span>
                          <span>🔁 {tweet.reposts.toLocaleString()}</span>
                        </div>
                        <a
                          href={tweet.tweetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          View on X →
                        </a>
                      </div>
                    </div>
                  ))}
                  {tierLists[tier].length === 0 && (
                    <div className="text-gray-600 text-sm italic py-8 pl-2">
                      {tier === "DISCARD"
                        ? "Discarded cards appear here"
                        : "Drop cards here"}
                    </div>
                  )}
                </div>
                {tierLists[tier].length > 3 && (
                  <button
                    onClick={() => scrollTier(tier, "right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white text-xl"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pb-6 text-gray-400 text-sm">
          Questions —{" "}
          <a
            href="https://x.com/RareRestore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            DM @RareRestore
          </a>
        </div>
      </div>

      <div className="fixed -left-[9999px] top-0">
        <div ref={shareRef} className="bg-black p-8 w-[900px]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">🇪🇸 Ceuta Madness 🇪🇸</h1>
            <p className="text-gray-400 mt-1">
              💥 Carnage at the Spain-Morocco Border 💥
            </p>
          </div>
          <div className="space-y-5">
            {VISIBLE_TIERS.map((tier) => (
              <div key={tier} className="flex items-start gap-3">
                <div
                  className="w-24 h-24 flex-shrink-0 rounded-xl flex flex-col items-center justify-center text-center px-1"
                  style={{
                    backgroundColor: TIER_COLORS[tier] + "33",
                    border: `2px solid ${TIER_COLORS[tier]}`,
                  }}
                >
                  <div
                    className="text-3xl font-black leading-none"
                    style={{ color: TIER_COLORS[tier] }}
                  >
                    {tier}
                  </div>
                  <div className="text-[10px] font-medium text-white/90 mt-1 leading-tight break-words w-full px-0.5">
                    {tierTitles[tier]}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {tierLists[tier].map((tweet) => (
                    <div key={tweet.id} className="w-24 text-center">
                      <img
                        src={`/images/${tweet.id}.png`}
                        alt=""
                        className="w-24 h-24 object-cover rounded-xl mb-1 bg-gray-800"
                      />
                      <div className="text-[11px] text-gray-300 truncate">
                        {tweet.handle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 text-gray-500 text-sm space-y-1">
            <div>Make your own → ceuta.vercel.app</div>
            <div>Questions — DM @RareRestore on X</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <TierBoard />
    </Suspense>
  );
}
