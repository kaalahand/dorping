// Illustrated WhatsApp + book mockup. Pure CSS/SVG — no stock imagery.

export const WhatsAppMockup = () => {
  return (
    <div className="relative bg-surface-1 rounded-2xl p-6 sm:p-8" style={{ boxShadow: "0 4px 24px hsl(var(--ink) / 0.08)" }}>
      {/* iPhone frame */}
      <div className="mx-auto w-full max-w-[280px] aspect-[9/19] bg-ink rounded-[40px] p-[6px] shadow-xl">
        <div className="w-full h-full bg-[#ECE5DD] rounded-[34px] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="bg-[#075E54] text-white px-4 pt-3 pb-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center text-[11px] font-medium">माँ</div>
            <div className="flex-1">
              <div className="text-[12px] font-medium leading-tight">Maa</div>
              <div className="text-[9px] opacity-80 leading-tight">online</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.6 0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1 0 9.4 7.6 17 17 17 .5 0 1-.5 1-1v-3.4c0-.5-.5-1-1-1z"/></svg>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-3 flex flex-col gap-2 text-[11px]">
            {/* Sent bubble */}
            <div className="self-end max-w-[78%] bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2.5 py-1.5 shadow-sm">
              <p className="text-ink leading-snug" style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}>
                माँ, अपनी बचपन की एक कहानी सुनाओ
              </p>
              <span className="block text-[8px] text-ink-muted text-right mt-0.5">10:42 ✓✓</span>
            </div>

            {/* Received bubble */}
            <div className="self-start max-w-[80%] bg-white rounded-lg rounded-tl-sm px-2.5 py-1.5 shadow-sm">
              <p className="text-ink leading-snug" style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}>
                हाँ बेटा, बहुत सी कहानियाँ हैं। कहाँ से शुरू करूँ?
              </p>
              <span className="block text-[8px] text-ink-faint text-right mt-0.5">10:43</span>
            </div>

            {/* Voice message */}
            <div className="self-start max-w-[80%] bg-white rounded-lg rounded-tl-sm px-2.5 py-2 shadow-sm flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#128C7E] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="flex items-center gap-[2px] flex-1 h-5">
                {[6,10,14,8,16,12,18,10,14,8,12,6,10,14,8].map((h, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-[#128C7E]" style={{ height: `${h}px`, opacity: i < 5 ? 1 : 0.4 }} />
                ))}
              </div>
              <span className="text-[9px] text-ink-faint">2:14</span>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-3 py-2 bg-[#F0F0F0] flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full h-6" />
            <div className="w-6 h-6 rounded-full bg-[#128C7E]" />
          </div>
        </div>
      </div>

      {/* Hardcover book mockup */}
      <div className="mt-6 mx-auto w-[180px]">
        <div className="relative h-[60px]" style={{ perspective: "600px" }}>
          <div
            className="absolute inset-0 rounded-r-sm rounded-l-[2px] flex items-center justify-between px-3"
            style={{
              background: "linear-gradient(180deg, hsl(var(--ink)) 0%, hsl(212 40% 12%) 100%)",
              boxShadow: "0 8px 24px hsl(var(--ink) / 0.25), inset 4px 0 0 hsl(var(--gold) / 0.3)",
            }}
          >
            <span className="font-display italic text-[11px] text-paper/90 tracking-wide">
              Sharma Family Stories
            </span>
            <span className="font-display text-gold text-[10px]">·</span>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-ink-faint font-body">A hardcover, delivered.</p>
      </div>
    </div>
  );
};
