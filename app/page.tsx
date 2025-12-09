"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/product-carousel"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, Star, StarHalf } from "lucide-react"
import { useReferralCode } from "@/hooks/useReferralCode"

function HomeContent() {
  // Initialize referral tracking on home page
  useReferralCode()

  const scrollToSection = () => {
    document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
  }

  // Video testimonials state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const testimonials = ["/t1.mp4", "/t2.mp4",]
  const posters = ["/t1.png", "/t2.png",]

  useEffect(() => {
    // Auto-advance videos every 8 seconds
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    // Play current video when index changes
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentVideoIndex])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted
      }
    })
  }

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Carousel Section - reduced from full screen to moderate height */}
      <section className="relative w-full h-[460px] sm:h-[600px] md:h-[700px] lg:h-[820px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <ProductCarousel />
        </div>
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-pulse-soft">
          <span className="text-white/60 text-xs sm:text-sm font-medium">Scroll to explore</span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

   

      {/* Guaranteed Growth Highlight - Aesthetic Design */}
      <section className="py-6 md:py-8 px-3 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-6 md:p-8 bg-gradient-to-br from-background via-card to-background border-2 border-primary/30 rounded-2xl shadow-xl overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/20 rounded-full mb-3 md:mb-4">
                <span className="text-primary text-xs md:text-sm font-semibold uppercase tracking-wider">100% Guaranteed</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 md:mb-3 premium-text">
                ✅ Guaranteed Hair Growth
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Grow Essence is a cold-pressed botanical serum that reawakens dormant follicles, restores scalp balance, and delivers visible thickness in as little as 8 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Bar Section - After Carousel */}
      <section className="py-6 md:py-8 px-3 sm:px-4 lg:px-8 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 p-4 md:p-6 bg-background border-2 border-primary/20 rounded-xl shadow-lg">
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 md:w-8 md:h-8 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : i === 4
                        ? "fill-yellow-400/70 text-yellow-400/70"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground">4.7</span>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            
            {/* Reviews Count */}
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-base text-muted-foreground mb-1">Total Reviews</p>
              <p className="text-xl md:text-2xl font-bold text-foreground">4-5K Reviews</p>
            </div>
            
            {/* Badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <span className="text-green-700 dark:text-green-400 font-semibold text-sm">✓ Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Headline Section */}
      <section className="py-12 md:py-20 px-3 sm:px-4 lg:px-8 overflow-hidden bg-gradient-to-b from-background to-card/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 md:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight premium-text">
              Reach Your Full Hair Potential
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Grow Essence blends potent ayurvedic oils, vitamins, and antioxidants to anchor roots, reduce fall, and promote faster regrowth for men and women.
            </p>

            {/* Trust Badges - Mobile optimized */}
            <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 justify-center pt-2 md:pt-4 px-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold">
                <span className="text-base md:text-lg">✓</span>
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold">
                <span className="text-base md:text-lg">✓</span>
                <span>Clinically Tested</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold">
                <span className="text-base md:text-lg">✓</span>
                <span>Fast Delivery</span>
              </div>
            </div>

          
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 md:pt-8 px-2">
              <Link
                href="/product"
                className="px-6 md:px-8 py-2.5 md:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Buy Now
              </Link>
              <button
                onClick={scrollToSection}
                className="px-6 md:px-8 py-2.5 md:py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300 text-sm md:text-base"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

    
      <section id="benefits" className="py-12 md:py-20 px-3 sm:px-4 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 premium-text px-2">
              Why Choose Grow Essence?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Our carefully selected natural ingredients work together to restore hair health, volume, and shine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: "🌿",
                title: "Cold-Pressed Botanicals",
                description:
                  "Infused with bhringraj, rosemary, and onion seed oils to nourish scalp microbiome without harsh chemicals.",
                delay: "0ms",
              },
              {
                icon: "⚗️",
                title: "Clinic-Tested Results",
                description: "Dermatologist-approved formulation proven to reduce hair fall and improve density within 12 weeks.",
                delay: "150ms",
              },
              {
                icon: "👥",
                title: "Trusted By 25K+ Users",
                description:
                  "Community-loved formula with thousands of five-star reviews and real transformation stories.",
                delay: "300ms",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="p-4 md:p-8 bg-background border border-border rounded-lg md:rounded-xl hover:border-primary/50 transition-all duration-300 group"
                style={{
                  animation: `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${benefit.delay} forwards`,
                  opacity: 0,
                }}
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{benefit.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{benefit.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

         {/* Testimonials Section (Video Carousel) */}
         <section id="testimonials" className="py-12 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 premium-text px-2">
              Real Customer Testimonials
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              100% real video reviews from our satisfied customers. Watch their authentic experiences.
            </p>
          </div>

          {/* Video Carousel */}
          <div className="relative group max-w-md mx-auto">
            {/* Main Video Container */}
            <div className="relative w-full aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden border-2 border-border bg-black shadow-2xl">
              {testimonials.map((videoSrc, index) => (
                <video
                  key={index}
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  src={videoSrc}
                  poster={posters[index]}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay={index === currentVideoIndex}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ))}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />

              {/* Control Buttons */}
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 md:p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-300 hover:scale-110"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Removed stuck play overlay for smoother UX on iOS */}
            </div>

            {/* Video Thumbnails/Navigation Dots */}
            <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  className={`flex-1 max-w-[120px] h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentVideoIndex
                      ? "border-primary scale-105 shadow-lg"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <img
                    src={posters[index]}
                    alt={`Testimonial ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>



            {/* Video Counter */}
            <div className="text-center mt-4">
              <p className="text-sm md:text-base text-muted-foreground">
                Video {currentVideoIndex + 1} of {testimonials.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      

   {/* Reviews Section (Text testimonials) */}
      <section id="testimonials" className="py-12 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold premium-text">Real Customer Reviews</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                name: "Himanshu Sharma",
                text:
                  "“Three months in, my hair feels fuller and the thinning patches at the crown are filling in beautifully.”",
                rating: 4.5,
              },
              {
                name: "Rohit Mehta",
                text: "Hair fall reduced drastically within eight weeks, and baby hair growth is clearly visible. Amazing product!",
                rating: 5,
              },
              {
                name: "Arjun Iyer",
                text: "I was skeptical, but by month three the breakage stopped and my strands feel stronger and shinier.",
                rating: 4,
              },
              {
                name: "Sahil Verma",
                text:
                  "Tried everything else before—Grow Essence is the first serum that actually thickened my hairline.",
                rating: 4.5,
              },
              {
                name: "Ritika Kapoor",
                text:
                  "My ponytail feels twice as thick now. The serum absorbs quickly and keeps my scalp soothed.",
                rating: 5,
              },
              {
                name: "Karan Bhatt",
                text:
                  "Used it nightly and saw steady progress. Hair feels nourished, and the shedding in the shower is minimal now.",
                rating: 4.5,
              },
              {
                name: "Harsh Chatterjee",
                text:
                  "Consistency was key—by the third month the thinning spots above my temples had started filling in.",
                rating: 4,
              },
              {
                name: "Priya Malhotra",
                text:
                  "Never expected it to work this well. Hair fall reduced and strands feel stronger in just four months.",
                rating: 4.5,
              },
              {
                name: "Tanish Kulkarni",
                text:
                  "Followed the routine daily, no excuses. Hair looks fuller and healthier now. Totally worth it!",
                rating: 4,
              },
            ].map((r, idx) => (
              <div key={idx} className="p-5 md:p-6 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => {
                    const diff = r.rating - i
                    if (diff >= 1) {
                      return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    }
                    if (diff >= 0.5) {
                      return <StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    }
                    return <Star key={i} className="w-4 h-4 text-muted-foreground/40" />
                  })}
                  <span className="text-xs font-semibold text-muted-foreground ml-1">{r.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">{r.text}</p>
                <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">🙂</span>
                  <span>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-3 sm:px-4 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center">
            {[
              { number: "25K+", label: "Happy Customers" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "100%", label: "Natural Ingredients" },
            ].map((stat, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">{stat.number}</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 premium-text px-2">
            Start Your Hair Growth Journey Today
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Join thousands of satisfied customers and unlock your full hair potential. Limited-time savings available this week only.
          </p>
          <Link
            href="/product"
            className="inline-block px-6 md:px-10 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            Get Grow Essence Now
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
