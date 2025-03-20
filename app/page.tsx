"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronRight,
  CheckCircle2,
  Star,
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ArrowRight,
  Truck,
  ShieldCheck,
  GlassWater,
  Award,
  Clock,
  MapPin,
  ChevronUp,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"

// Animated wine glass component
const AnimatedWineGlass = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-5"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M50 10 C30 30 30 50 30 70 L70 70 C70 50 70 30 50 10 Z"
          stroke="#5B0E2D"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M30 70 L40 90 L60 90 L70 70"
          stroke="#5B0E2D"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.path
          d="M40 90 L60 90"
          stroke="#5B0E2D"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </svg>
    </div>
  )
}

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#F8F5F2]"></div>
      <AnimatedWineGlass />

      {/* Animated wine splashes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#5B0E2D]/5"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, 0.2, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated grape elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`grape-${i}`}
          className="absolute rounded-full bg-[#4A7862]/5"
          style={{
            width: Math.random() * 200 + 30,
            height: Math.random() * 200 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: "50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, 0.15, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Wine product type
type WineProduct = {
  id: number
  name: string
  price: string
  oldPrice?: string
  rating: number
  reviews: number
  image: string
  tag?: string
  type: string
  region: string
  year: string
  description: string
  alcohol: string
  grapeVariety: string
  foodPairing: string[]
  awards?: string[]
  isNew?: boolean
  isBestseller?: boolean
}

// Sample wine products data with better image descriptions
const wineProducts: WineProduct[] = [
  {
    id: 1,
    name: "Ribera del Duero Reserva 2018",
    price: "29,99",
    oldPrice: "39,99",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+tinto+Ribera+del+Duero",
    tag: "Oferta",
    type: "Tinto",
    region: "Ribera del Duero",
    year: "2018",
    description:
      "Un vino elegante y complejo con notas de frutos rojos maduros, especias y un toque de roble. Taninos sedosos y final persistente.",
    alcohol: "14.5%",
    grapeVariety: "Tempranillo",
    foodPairing: ["Carnes rojas", "Cordero asado", "Quesos curados"],
    awards: ["Medalla de Oro - Decanter 2022", "92 puntos - Wine Spectator"],
    isBestseller: true,
  },
  {
    id: 2,
    name: "Albariño Rías Baixas 2022",
    price: "19,99",
    rating: 4.6,
    reviews: 86,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+blanco+Albariño",
    tag: "Nuevo",
    type: "Blanco",
    region: "Rías Baixas",
    year: "2022",
    description:
      "Fresco y aromático con notas cítricas, manzana verde y un toque mineral. Acidez equilibrada y final limpio.",
    alcohol: "12.5%",
    grapeVariety: "Albariño",
    foodPairing: ["Mariscos", "Pescados blancos", "Ensaladas"],
    isNew: true,
  },
  {
    id: 3,
    name: "Rioja Gran Reserva 2015",
    price: "45,99",
    rating: 4.9,
    reviews: 215,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+tinto+Rioja+Gran+Reserva",
    type: "Tinto",
    region: "Rioja",
    year: "2015",
    description:
      "Intenso y complejo con notas de frutos negros, vainilla, tabaco y especias. Taninos pulidos y final muy largo.",
    alcohol: "14%",
    grapeVariety: "Tempranillo, Graciano, Mazuelo",
    foodPairing: ["Carne de caza", "Estofados", "Quesos añejos"],
    awards: ["95 puntos - Robert Parker", "Medalla de Platino - Decanter"],
    isBestseller: true,
  },
  {
    id: 4,
    name: "Cava Brut Nature Reserva",
    price: "24,99",
    oldPrice: "32,99",
    rating: 4.7,
    reviews: 68,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+Cava+Brut+Nature",
    tag: "Oferta",
    type: "Espumoso",
    region: "Penedès",
    year: "2019",
    description:
      "Burbujas finas y persistentes. Aromas de manzana, cítricos y notas de panadería. Seco, fresco y elegante.",
    alcohol: "11.5%",
    grapeVariety: "Macabeo, Xarel·lo, Parellada",
    foodPairing: ["Aperitivos", "Mariscos", "Arroces"],
  },
  {
    id: 5,
    name: "Priorat Crianza 2019",
    price: "34,99",
    rating: 4.5,
    reviews: 92,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+tinto+Priorat",
    type: "Tinto",
    region: "Priorat",
    year: "2019",
    description:
      "Potente e intenso con notas de frutos negros, minerales y especias. Taninos firmes y final persistente.",
    alcohol: "15%",
    grapeVariety: "Garnacha, Cariñena",
    foodPairing: ["Carnes a la brasa", "Guisos", "Quesos potentes"],
  },
  {
    id: 6,
    name: "Verdejo Rueda 2021",
    price: "15,99",
    rating: 4.3,
    reviews: 75,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+blanco+Verdejo",
    type: "Blanco",
    region: "Rueda",
    year: "2021",
    description:
      "Aromático y fresco con notas de hierba fresca, cítricos y frutas tropicales. Acidez vibrante y final limpio.",
    alcohol: "13%",
    grapeVariety: "Verdejo",
    foodPairing: ["Pescados", "Arroces", "Verduras"],
    isNew: true,
  },
  {
    id: 7,
    name: "Rosado Navarra 2022",
    price: "14,99",
    rating: 4.2,
    reviews: 58,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+rosado+Navarra",
    type: "Rosado",
    region: "Navarra",
    year: "2022",
    description:
      "Fresco y afrutado con notas de fresas, frambuesas y un toque floral. Equilibrado y con final agradable.",
    alcohol: "13.5%",
    grapeVariety: "Garnacha",
    foodPairing: ["Pastas", "Arroces", "Carnes blancas"],
  },
  {
    id: 8,
    name: "Mencía Bierzo 2020",
    price: "22,99",
    rating: 4.4,
    reviews: 63,
    image: "/placeholder.svg?height=400&width=400&text=Botella+de+vino+tinto+Mencía",
    type: "Tinto",
    region: "Bierzo",
    year: "2020",
    description: "Elegante y frutal con notas de cerezas, frambuesas y un toque floral. Taninos suaves y final fresco.",
    alcohol: "13.5%",
    grapeVariety: "Mencía",
    foodPairing: ["Aves", "Cerdo", "Quesos semicurados"],
    isNew: true,
  },
]

// Wine regions data with better image descriptions
const wineRegions = [
  {
    name: "Rioja",
    country: "España",
    description: "Conocida por sus vinos tintos de alta calidad elaborados principalmente con uva Tempranillo.",
    image: "/placeholder.svg?height=300&width=500&text=Viñedos+de+Rioja+al+atardecer",
  },
  {
    name: "Ribera del Duero",
    country: "España",
    description:
      "Región que produce algunos de los mejores tintos de España, principalmente con la variedad Tempranillo.",
    image: "/placeholder.svg?height=300&width=500&text=Viñedos+de+Ribera+del+Duero",
  },
  {
    name: "Bordeaux",
    country: "Francia",
    description: "Región vinícola por excelencia, famosa por sus mezclas de Cabernet Sauvignon y Merlot.",
    image: "/placeholder.svg?height=300&width=500&text=Château+de+Bordeaux+con+viñedos",
  },
  {
    name: "Toscana",
    country: "Italia",
    description: "Hogar del Chianti y el Brunello di Montalcino, con la uva Sangiovese como protagonista.",
    image: "/placeholder.svg?height=300&width=500&text=Colinas+de+la+Toscana+con+viñedos",
  },
  {
    name: "Mendoza",
    country: "Argentina",
    description: "Reconocida mundialmente por sus Malbecs intensos y de gran cuerpo.",
    image: "/placeholder.svg?height=300&width=500&text=Viñedos+de+Mendoza+con+los+Andes",
  },
  {
    name: "Napa Valley",
    country: "Estados Unidos",
    description: "Famosa por sus Cabernet Sauvignon de clase mundial y sus Chardonnay.",
    image: "/placeholder.svg?height=300&width=500&text=Viñedos+de+Napa+Valley+California",
  },
]

// Wine pairings data with better image descriptions
const winePairings = [
  {
    wine: "Vinos Tintos Robustos",
    pairing: "Carnes rojas, caza y quesos curados",
    description:
      "Los taninos de estos vinos complementan perfectamente los sabores intensos de las carnes rojas y la caza.",
    image: "/placeholder.svg?height=300&width=300&text=Copa+de+vino+tinto+con+carne+asada",
  },
  {
    wine: "Vinos Blancos Secos",
    pairing: "Pescados, mariscos y ensaladas",
    description: "La acidez y frescura de estos vinos realzan los sabores delicados de los pescados y mariscos.",
    image: "/placeholder.svg?height=300&width=300&text=Copa+de+vino+blanco+con+mariscos",
  },
  {
    wine: "Vinos Rosados",
    pairing: "Pastas, arroces y carnes blancas",
    description: "Versátiles por naturaleza, los rosados son perfectos para platos mediterráneos y carnes ligeras.",
    image: "/placeholder.svg?height=300&width=300&text=Copa+de+vino+rosado+con+pasta",
  },
  {
    wine: "Vinos Espumosos",
    pairing: "Aperitivos, sushi y postres",
    description:
      "Las burbujas limpian el paladar y contrastan maravillosamente con la textura cremosa de muchos aperitivos.",
    image: "/placeholder.svg?height=300&width=300&text=Copa+de+champagne+con+aperitivos",
  },
]

// Wine experiences data
const wineExperiences = [
  {
    title: "Cata de vinos premium",
    description: "Descubre los matices de nuestros vinos más exclusivos guiado por expertos sommeliers.",
    image: "/placeholder.svg?height=400&width=600&text=Cata+de+vinos+premium+con+sommelier",
  },
  {
    title: "Visita a bodegas",
    description:
      "Recorre las mejores bodegas y descubre el proceso de elaboración del vino desde la viña hasta la botella.",
    image: "/placeholder.svg?height=400&width=600&text=Interior+de+bodega+con+barricas",
  },
  {
    title: "Maridaje gourmet",
    description: "Aprende a combinar vinos con diferentes platos para crear experiencias gastronómicas inolvidables.",
    image: "/placeholder.svg?height=400&width=600&text=Mesa+de+maridaje+con+vinos+y+comida",
  },
]

// Curved section divider component
const CurvedDivider = ({ position = "top", color = "#F8F5F2", inverted = false, className = "" }) => {
  const path = inverted ? "M0,0 L0,50 Q500,0 1000,50 L1000,0 Z" : "M0,50 L0,50 Q500,0 1000,50 L1000,0 L0,0 Z"

  return (
    <div
      className={`absolute left-0 right-0 w-full overflow-hidden ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ height: "50px" }}
    >
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 50"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path}></path>
      </svg>
    </div>
  )
}

// Wine bottle shape component
const WineBottleShape = ({ className = "", fill = "#5B0E2D" }) => {
  return (
    <svg className={className} viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40,20 L40,50 C40,60 30,70 30,80 L30,260 C30,280 70,280 70,260 L70,80 C70,70 60,60 60,50 L60,20 Z"
        fill={fill}
        opacity="0.1"
      />
    </svg>
  )
}

// Wine glass shape component
const WineGlassShape = ({ className = "", fill = "#5B0E2D" }) => {
  return (
    <svg className={className} viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30,10 C30,10 10,30 10,60 C10,90 50,110 50,110 C50,110 90,90 90,60 C90,30 70,10 70,10 Z M40,110 L40,180 L60,180 L60,110 Z M30,180 L70,180 Z"
        fill={fill}
        opacity="0.1"
      />
    </svg>
  )
}

// Product Card Component
const ProductCard = ({ product }: { product: WineProduct }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#F8F5F2] to-[#EFE6E0]">
        {product.tag && (
          <Badge
            className={`absolute left-2 top-2 z-10 ${product.tag === "Oferta" ? "bg-[#5B0E2D]" : "bg-[#C9A959]"} font-serif`}
          >
            {product.tag}
          </Badge>
        )}
        {product.isNew && !product.tag && (
          <Badge className="absolute left-2 top-2 z-10 bg-[#4A7862] font-serif">Nuevo</Badge>
        )}
        {product.isBestseller && (
          <Badge className="absolute right-2 top-2 z-10 bg-[#C9A959] text-[#2A0A0F] font-serif">Bestseller</Badge>
        )}
        <motion.div
          className="absolute right-2 top-12 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/90 shadow-sm">
            <Heart className="h-4 w-4 text-[#5B0E2D]" />
            <span className="sr-only">Añadir a favoritos</span>
          </Button>
        </motion.div>
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={600}
          className="h-full w-full object-contain p-4 transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-white p-4"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Button className="w-full bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">Añadir al carrito</Button>
        </motion.div>
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-[#5B0E2D]">{product.type}</span>
              <span className="text-xs text-[#5E3A45]">•</span>
              <span className="text-xs font-medium text-[#5E3A45]">{product.year}</span>
            </div>
            <h3 className="font-medium text-[#2A0A0F] line-clamp-2 font-serif mt-1">{product.name}</h3>
            <p className="text-xs text-[#5E3A45] mt-1">{product.region}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${j < Math.floor(product.rating) ? "fill-[#C9A959] text-[#C9A959]" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
          </div>
          <span className="text-xs text-[#5E3A45]">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-[#2A0A0F]">{product.price}€</span>
          {product.oldPrice && <span className="text-sm text-gray-500 line-through">{product.oldPrice}€</span>}
        </div>
      </div>
    </motion.div>
  )
}

// Main component
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("todos")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(wineProducts)
  const [isScrolled, setIsScrolled] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<WineProduct | null>(null)

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const regionsRef = useRef<HTMLDivElement>(null)

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Filter products based on active tab and other filters
  useEffect(() => {
    let result = [...wineProducts]

    // Filter by type
    if (activeTab !== "todos") {
      result = result.filter((product) => product.type.toLowerCase() === activeTab)
    }

    // Sort products
    if (sortBy === "price-asc") {
      result.sort((a, b) => Number.parseFloat(a.price.replace(",", ".")) - Number.parseFloat(b.price.replace(",", ".")))
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number.parseFloat(b.price.replace(",", ".")) - Number.parseFloat(a.price.replace(",", ".")))
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
  }, [activeTab, sortBy])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F8F5F2] relative">
      <AnimatedBackground />

      {/* Announcement Bar */}
      <motion.div
        className="w-full bg-[#5B0E2D] py-2 text-center text-sm text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>&nbsp;</p>
      </motion.div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="h-10 w-10 rounded-full bg-[#5B0E2D] flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold">V</span>
              </motion.div>
              <motion.span
                className="font-serif text-xl font-bold text-[#2A0A0F]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                VinoExquisito
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {["Vinos", "Regiones", "Maridajes", "Experiencias", "Club de Vino"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-[#2A0A0F] hover:text-[#5B0E2D] relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5B0E2D] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar vinos..."
                className="w-[200px] pl-8 rounded-full bg-[#f5f5f5] border-none focus-visible:ring-[#5B0E2D]"
              />
            </div>
            <Link href="#account" className="text-sm font-medium text-[#2A0A0F] hover:text-[#5B0E2D]">
              Mi cuenta
            </Link>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-[#2A0A0F]" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5B0E2D] text-[10px] font-medium text-white">
                  2
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5B0E2D] text-[10px] font-medium text-white">
                  2
                </span>
              </Button>
            </motion.div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[300px] bg-white p-6"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#5B0E2D] flex items-center justify-center">
                    <span className="text-white font-bold">V</span>
                  </div>
                  <span className="font-serif text-xl font-bold text-[#2A0A0F]">VinoExquisito</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Cerrar menú</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {["Vinos", "Regiones", "Maridajes", "Experiencias", "Club de Vino"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-lg font-serif font-medium text-[#2A0A0F] hover:text-[#5B0E2D] py-2 border-b border-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar vinos..."
                    className="w-full pl-8 rounded-full bg-[#f5f5f5] border-none focus-visible:ring-[#5B0E2D]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="#account"
                    className="text-sm font-medium text-[#2A0A0F] hover:text-[#5B0E2D] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    href="#cart"
                    className="text-sm font-medium text-[#2A0A0F] hover:text-[#5B0E2D] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi carrito (2)
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section - Asymmetric Design */}
        <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <motion.div className="absolute inset-0 -z-10" style={{ opacity: heroOpacity, scale: heroScale }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F2] to-[#EFE6E0]"></div>
            <WineBottleShape className="absolute -right-20 top-0 h-full opacity-20" fill="#5B0E2D" />
            <WineGlassShape className="absolute -left-20 bottom-0 h-2/3 opacity-20" fill="#5B0E2D" />
          </motion.div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <motion.div
                className="lg:col-span-7 lg:pr-12 flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Badge className="w-fit bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">Selección Premium</Badge>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#2A0A0F] leading-tight">
                    El arte de la <span className="text-[#5B0E2D]">viticultura</span> en cada botella
                  </h1>
                  <p className="text-lg md:text-xl text-[#5E3A45] max-w-[600px]">
                    Seleccionamos los mejores vinos de viñedos excepcionales para ofrecerte una experiencia única en
                    cada copa.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gap-1 bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">
                      Explorar vinos <ChevronRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="border-[#2A0A0F] text-[#2A0A0F] font-serif">
                      Club de vino
                    </Button>
                  </motion.div>
                </div>
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Award className="h-6 w-6 text-[#C9A959]" />
                    <span className="text-sm font-medium">Vinos premiados</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <Truck className="h-6 w-6 text-[#5B0E2D]" />
                    <span className="text-sm font-medium">Envío seguro</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <ShieldCheck className="h-6 w-6 text-[#5B0E2D]" />
                    <span className="text-sm font-medium">Calidad garantizada</span>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="lg:col-span-5 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#C9A959] opacity-10 blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#5B0E2D] opacity-10 blur-xl"></div>

                {/* Staggered wine bottles display */}
                <div className="relative h-[500px] w-full">
                  <motion.div
                    className="absolute top-0 left-[10%] w-[30%] z-20"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Image
                      src="/placeholder.svg?height=500&width=150&text=Botella+de+vino+tinto+premium"
                      width={150}
                      height={500}
                      alt="Botella de vino tinto premium"
                      className="rounded-lg shadow-lg object-contain"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute top-10 left-[35%] w-[30%] z-30"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Image
                      src="/placeholder.svg?height=500&width=150&text=Botella+de+vino+blanco+premium"
                      width={150}
                      height={500}
                      alt="Botella de vino blanco premium"
                      className="rounded-lg shadow-lg object-contain"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute top-20 left-[60%] w-[30%] z-10"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <Image
                      src="/placeholder.svg?height=500&width=150&text=Botella+de+vino+rosado+premium"
                      width={150}
                      height={500}
                      alt="Botella de vino rosado premium"
                      className="rounded-lg shadow-lg object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <CurvedDivider position="bottom" color="#FFFFFF" />
        </section>

        {/* Wine Categories Section - Hexagonal Grid */}
        <section id="vinos" className="w-full py-16 md:py-24 bg-white relative">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block relative">
                <span className="absolute -left-6 -top-6 text-6xl text-[#5B0E2D]/10 font-serif">❝</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#2A0A0F] relative z-10">
                  Nuestras Variedades
                </h2>
                <span className="absolute -right-6 -bottom-6 text-6xl text-[#5B0E2D]/10 font-serif">❞</span>
              </div>
              <p className="max-w-[700px] text-[#5E3A45] text-lg md:text-xl">
                Desde tintos robustos hasta blancos refrescantes, encuentra el vino perfecto para cada ocasión
              </p>
            </motion.div>

            {/* Hexagonal grid layout */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                {
                  name: "Vinos Tintos",
                  image: "/placeholder.svg?height=300&width=300&text=Copa+de+vino+tinto",
                  count: "124 vinos",
                  description: "Intensos y complejos, perfectos para acompañar carnes y quesos",
                },
                {
                  name: "Vinos Blancos",
                  image: "/placeholder.svg?height=300&width=300&text=Copa+de+vino+blanco",
                  count: "86 vinos",
                  description: "Frescos y aromáticos, ideales para pescados y mariscos",
                },
                {
                  name: "Vinos Rosados",
                  image: "/placeholder.svg?height=300&width=300&text=Copa+de+vino+rosado",
                  count: "53 vinos",
                  description: "Versátiles y afrutados, perfectos para aperitivos y platos ligeros",
                },
                {
                  name: "Espumosos",
                  image: "/placeholder.svg?height=300&width=300&text=Copa+de+champagne",
                  count: "78 vinos",
                  description: "Elegantes y festivos, para celebraciones y momentos especiales",
                },
              ].map((category, i) => (
                <motion.div
                  key={i}
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Link
                    href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative mb-4 overflow-hidden rounded-full w-48 h-48 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5B0E2D]/20 to-[#5B0E2D]/60 z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">{category.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-[#5E3A45] font-medium">{category.count}</p>
                    <p className="mt-2 text-[#2A0A0F] max-w-[250px]">{category.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section - Diagonal Layout */}
        <section
          ref={productsRef}
          className="w-full py-16 md:py-24 bg-gradient-to-br from-[#F8F5F2] to-[#EFE6E0] relative overflow-hidden"
        >
          <WineBottleShape className="absolute -left-20 top-0 h-full opacity-10 rotate-12" fill="#5B0E2D" />
          <WineGlassShape className="absolute -right-20 bottom-0 h-2/3 opacity-10 -rotate-12" fill="#5B0E2D" />

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">Selección del Sommelier</Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#2A0A0F]">
                Vinos Destacados
              </h2>
              <p className="max-w-[700px] text-[#5E3A45] text-lg md:text-xl">
                Descubre nuestra selección de vinos excepcionales elegidos por nuestros expertos
              </p>
            </motion.div>

            {/* Product Filters */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                <Tabs defaultValue="todos" className="w-full md:w-auto" onValueChange={setActiveTab}>
                  <TabsList className="bg-white">
                    <TabsTrigger value="todos" className="font-serif">
                      Todos
                    </TabsTrigger>
                    <TabsTrigger value="tinto" className="font-serif">
                      Tintos
                    </TabsTrigger>
                    <TabsTrigger value="blanco" className="font-serif">
                      Blancos
                    </TabsTrigger>
                    <TabsTrigger value="rosado" className="font-serif">
                      Rosados
                    </TabsTrigger>
                    <TabsTrigger value="espumoso" className="font-serif">
                      Espumosos
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select defaultValue="featured" onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px] bg-white border-none">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                      <SelectItem value="rating">Mejor valorados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Diagonal Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.slice(0, 8).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    transform: i % 2 === 0 ? "translateY(20px)" : "translateY(0px)",
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                className="gap-2 border-[#2A0A0F] text-[#2A0A0F] font-serif bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                Ver todos los vinos <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <CurvedDivider position="bottom" color="#FFFFFF" />
        </section>

        {/* Wine Regions - Overlapping Cards */}
        <section id="regiones" className="w-full py-16 md:py-24 bg-white relative">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">Denominaciones de Origen</Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#2A0A0F]">
                Regiones Vinícolas
              </h2>
              <p className="max-w-[700px] text-[#5E3A45] text-lg md:text-xl">
                Explora los sabores únicos de las mejores regiones vinícolas del mundo
              </p>
            </motion.div>

            {/* Overlapping cards layout */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wineRegions.map((region, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{
                      y: -10,
                      zIndex: 20,
                      transition: { duration: 0.3 },
                    }}
                    className="relative z-10"
                  >
                    <Link
                      href={`#${region.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl block h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
                      <Image
                        src={region.image || "/placeholder.svg"}
                        alt={region.name}
                        width={500}
                        height={300}
                        className="aspect-[5/3] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 h-full w-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-[#C9A959]" />
                          <h3 className="text-2xl font-serif font-bold">{region.name}</h3>
                          <span className="text-sm text-white/80">• {region.country}</span>
                        </div>
                        <p className="text-white/90 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                          {region.description}
                        </p>
                        <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white text-white hover:bg-white hover:text-[#2A0A0F]"
                          >
                            Explorar región
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wine Experiences - Horizontal Scroll */}
        <section id="experiencias" className="w-full py-16 md:py-24 bg-[#2A0A0F] text-white relative overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#5B0E2D]/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#C9A959]/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#C9A959] hover:bg-[#C9A959]/90 text-[#2A0A0F] font-serif">
                Experiencias Únicas
              </Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">Vive el mundo del vino</h2>
              <p className="max-w-[700px] text-white/80 text-lg md:text-xl">
                Descubre experiencias exclusivas que te conectarán con la cultura y tradición vinícola
              </p>
            </motion.div>

            {/* Horizontal scroll section */}
            <div className="relative -mx-4 px-4 pb-4">
              <div className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory scrollbar-hide">
                {wineExperiences.map((experience, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-full sm:w-[85%] md:w-[600px] snap-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="bg-[#3D3B40]/50 backdrop-blur-sm rounded-xl overflow-hidden h-full">
                      <div className="relative h-64">
                        <Image
                          src={experience.image || "/placeholder.svg"}
                          alt={experience.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0A0F] to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-serif font-bold mb-2">{experience.title}</h3>
                        <p className="text-white/80">{experience.description}</p>
                        <Button className="mt-4 bg-[#C9A959] hover:bg-[#C9A959]/90 text-[#2A0A0F] font-serif">
                          Reservar ahora
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wine Pairings - Circular Layout */}
        <section id="maridajes" className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">Guía de Maridaje</Badge>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#2A0A0F]">
                El arte del maridaje
              </h2>
              <p className="max-w-[700px] text-[#5E3A45] text-lg md:text-xl">
                Descubre las combinaciones perfectas para realzar los sabores de tus vinos favoritos
              </p>
            </motion.div>

            {/* Circular layout */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {winePairings.map((pairing, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-3rem)] max-w-[300px]"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6 rounded-full overflow-hidden w-48 h-48 border-8 border-[#F8F5F2] shadow-lg">
                      <Image
                        src={pairing.image || "/placeholder.svg"}
                        alt={pairing.wine}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2A0A0F] mb-2">{pairing.wine}</h3>
                    <p className="font-medium text-[#5B0E2D] mb-3">{pairing.pairing}</p>
                    <p className="text-sm text-[#5E3A45]">{pairing.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="outline" className="gap-2 border-[#2A0A0F] text-[#2A0A0F] font-serif">
                Descargar guía completa de maridaje <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Wine Club - Split Layout */}
        <section
          id="club-de-vino"
          className="w-full py-16 md:py-24 bg-gradient-to-br from-[#2A0A0F] to-[#5B0E2D] text-white relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#C9A959]/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-[#C9A959] hover:bg-[#C9A959]/90 text-[#2A0A0F] font-serif">Club de Vino</Badge>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                  Únete a nuestro exclusivo Club de Vino
                </h2>
                <p className="text-white/80 text-lg">
                  Recibe selecciones mensuales de vinos excepcionales elegidos por nuestros expertos sommelier, con
                  notas de cata y sugerencias de maridaje.
                </p>
                <ul className="space-y-4">
                  {[
                    "Selección mensual de vinos premium",
                    "15% de descuento en todas tus compras",
                    "Acceso prioritario a vinos limitados",
                    "Invitaciones a catas y eventos exclusivos",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-[#C9A959] flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-[#C9A959] hover:bg-[#C9A959]/90 text-[#2A0A0F] font-serif">
                      Unirse ahora
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#2A0A0F] font-serif"
                    >
                      Más información
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="relative lg:h-[600px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#C9A959] opacity-20 blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>

                {/* Overlapping images */}
                <div className="relative h-full w-full">
                  <motion.div
                    className="absolute top-0 left-0 w-3/4 h-3/4 z-10 rounded-xl overflow-hidden shadow-xl"
                    initial={{ x: 50, y: 50, opacity: 0 }}
                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=500&text=Cata+de+vinos+premium"
                      width={500}
                      height={400}
                      alt="Cata de vinos premium"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 right-0 w-2/3 h-2/3 z-20 rounded-xl overflow-hidden shadow-xl"
                    initial={{ x: -50, y: -50, opacity: 0 }}
                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Image
                      src="/placeholder.svg?height=400&width=500&text=Selección+de+vinos+club"
                      width={500}
                      height={400}
                      alt="Selección de vinos club"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-16 md:py-24 bg-[#F8F5F2] relative overflow-hidden">
          <WineGlassShape className="absolute right-0 top-0 h-full opacity-5" fill="#5B0E2D" />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-[#2A0A0F] mb-4">
                    Suscríbete a nuestra newsletter
                  </h2>
                  <p className="text-[#5E3A45] mb-6">
                    Recibe las últimas novedades, ofertas exclusivas y consejos sobre vinos directamente en tu email.
                  </p>
                  <form className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Tu email"
                        className="bg-[#F8F5F2] border-[#E5E7EB] focus-visible:ring-[#5B0E2D]"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full bg-[#5B0E2D] hover:bg-[#5B0E2D]/90 font-serif">
                        Suscribirse
                      </Button>
                    </motion.div>
                    <p className="text-xs text-[#5E3A45]">
                      Al suscribirte, aceptas nuestra{" "}
                      <Link href="#" className="underline underline-offset-2 hover:text-[#5B0E2D]">
                        Política de Privacidad
                      </Link>
                    </p>
                  </form>
                </div>
                <div className="relative hidden md:block">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Bodega+con+barricas+de+vino"
                    alt="Bodega con barricas de vino"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {[
                {
                  icon: <Award className="h-8 w-8 text-[#5B0E2D]" />,
                  title: "Vinos premiados",
                  description: "Selección de vinos galardonados",
                },
                {
                  icon: <Truck className="h-8 w-8 text-[#5B0E2D]" />,
                  title: "Envío seguro",
                  description: "Embalaje especial para botellas",
                },
                {
                  icon: <GlassWater className="h-8 w-8 text-[#5B0E2D]" />,
                  title: "Calidad garantizada",
                  description: "Conservación óptima garantizada",
                },
                {
                  icon: <Clock className="h-8 w-8 text-[#5B0E2D]" />,
                  title: "Entrega rápida",
                  description: "24-48h en península",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="mb-4 rounded-full bg-[#5B0E2D]/10 p-4">{item.icon}</div>
                  <h3 className="text-lg font-serif font-bold text-[#2A0A0F]">{item.title}</h3>
                  <p className="text-sm text-[#5E3A45]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-12 md:py-16 bg-[#2A0A0F] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-[#5B0E2D] flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="font-serif font-bold text-white">VinoExquisito</span>
              </Link>
              <p className="text-sm text-white/80">
                Seleccionamos los mejores vinos de viñedos excepcionales para ofrecerte una experiencia única en cada
                copa.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook className="h-4 w-4" />, name: "Facebook" },
                  { icon: <Instagram className="h-4 w-4" />, name: "Instagram" },
                  { icon: <Twitter className="h-4 w-4" />, name: "Twitter" },
                  { icon: <Linkedin className="h-4 w-4" />, name: "LinkedIn" },
                ].map((social) => (
                  <motion.div key={social.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`#${social.name.toLowerCase()}`} className="text-white/80 hover:text-white">
                      <span className="sr-only">{social.name}</span>
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                        {social.icon}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium">Comprar</h3>
              <ul className="space-y-2">
                {["Vinos Tintos", "Vinos Blancos", "Vinos Rosados", "Espumosos"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/80 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium">Información</h3>
              <ul className="space-y-2">
                {["Sobre nosotros", "Blog del vino", "Guía de maridaje", "Contacto"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/80 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium">Ayuda</h3>
              <ul className="space-y-2">
                {["Envíos", "Devoluciones", "Métodos de pago", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/80 hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-white/60">
              &copy; {new Date().getFullYear()} VinoExquisito. Todos los derechos reservados.
            </p>
            <div className="mt-4 sm:mt-0 flex gap-4">
              <Link href="#" className="text-xs text-white/60 hover:text-white">
                Términos
              </Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white">
                Privacidad
              </Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#5B0E2D] text-white shadow-lg flex items-center justify-center z-50"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          scale: isScrolled ? 1 : 0.8,
          y: isScrolled ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className="h-6 w-6" />
      </motion.button>
    </div>
  )
}

