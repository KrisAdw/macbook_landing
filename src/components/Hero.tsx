import { useEffect, useRef } from "react"

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(videoRef.current) videoRef.current.playbackRate = 2;
    }, [])

  return (
    <section id="hero">
        <div>
            <h1>MacBook Pro</h1>
            <img src="/title.png" alt="MacBook Title" />
        </div>

        <video src="/videos/hero.mp4" autoPlay muted playsInline></video>

        <button>Buy</button>

        <p>From Rp 26.499.000 or Rp 2.199.000/mo for 12 month</p>
    </section>
  )
}

export default Hero