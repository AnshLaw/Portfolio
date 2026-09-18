"use client"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Props = { images: { src: string; alt: string }[]; title: string }
export function ProjectImageGallery({ images, title }: Props) {
  const [selected, setSelected] = useState(0)
  if (!images.length) return null
  const image = images[selected]
  return <div><Dialog><DialogTrigger asChild><button className="gallery-trigger" aria-label={`Enlarge ${title} image`}><Image src={image.src} alt={image.alt} width={1200} height={750} /></button></DialogTrigger>
    <DialogContent className="sm:max-w-5xl" aria-describedby={undefined}><DialogTitle className="sr-only">{title}</DialogTitle><Image src={image.src} alt={image.alt} width={1200} height={750} className="w-full h-auto" /></DialogContent>
  </Dialog>{images.length > 1 && <div className="flex gap-3 mt-3">{images.map((item, index) => <button key={item.src} onClick={() => setSelected(index)} aria-label={`View image ${index + 1}`} aria-pressed={selected === index}><Image src={item.src} alt={item.alt} width={120} height={75} /></button>)}</div>}</div>
}
