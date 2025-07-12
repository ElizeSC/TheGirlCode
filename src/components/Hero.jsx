import React from 'react'

export const Hero = () => {
  return (
    <div className="w-full py-32 px-6 text-center">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#5F4444] mb-4 leading-tight">
            Your secrets are safe with us, <p className="text-[#af3264]">bestie</p>
        </h1>
        <p className="text-lg text-[#4a2b2b] max-w-xl mx-auto">
          Your space to slow down, reflect, and write freely. Entries are saved on your device.
        </p>
      </div>
    </div>
  )
}
 
export default Hero