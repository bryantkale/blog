
'use client';
import { motion } from "motion/react";
import ImageCarousel from "../components/ImageCarousel/ImageCarousel";
import { artworkItems } from "../data";

export default function Artwork() {
  return (
    <div style={{
      padding: 'auto'
    }}>
      <h1 className="flex mb-4 text-2xl font-semibold">My Art Work</h1>
      {artworkItems.map((item, index) => (
        <div key={index} style={{
          paddingBottom: '4em',
          fontSize: '16px'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ImageCarousel item={item} />
          </motion.div>
          <h1 style={{ textDecoration: 'underline double' }}>{item.mainTitle}, {item.year}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
