import { FlickeringGrid } from './components/ui/flickering-grid';
import { useEncoder } from './hooks/useEncoder';
import { useIsMobile } from './hooks/useIsMobile';

import MessageInput from './components/encoder/MessageInput';
import BinaryOutput from './components/encoder/BinaryOutput';
import MorseOutput from './components/encoder/MorseOutput';
import Waveform from './components/encoder/Waveform';
import PlayMorse from './components/encoder/PlayMorse';

function App() {
  const { message, setMessage, morse, pulse, binaryFramed } = useEncoder();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center relative font-sans overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <FlickeringGrid
          className="absolute inset-0 z-0"
          squareSize={4}
          gridGap={6}
          color="#10b981"
          maxOpacity={0.5}
          flickerChance={0.3}
          style={{
             maskImage: `radial-gradient(circle ${isMobile ? '180px' : '600px'} at center, white, transparent)`,
             WebkitMaskImage: `radial-gradient(circle ${isMobile ? '280px' : '600px'} at center, white, transparent)`,
          }}
        />
      </div>
      
      <main className="w-full max-w-2xl relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="text-center space-y-4">
           <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">
             Interstellar Encoder
           </h1>
           <p className="text-secondary text-sm md:text-base max-w-md mx-auto leading-relaxed">
             Encode human language into universal cosmic signals.
           </p>
        </header>

        <div className="space-y-6">
          <MessageInput onMessageChange={setMessage} />

          {message && (
            <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BinaryOutput data={binaryFramed} />
                  <MorseOutput data={morse} />
               </div>
               
               <div className="space-y-4">
                  <Waveform pulseData={pulse} />
                  <PlayMorse morseData={morse} />
               </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto py-8 text-center text-xs text-secondary/50 font-medium">
        System v3.1 &bull; Signal Ready
      </footer>
    </div>
  );
}

export default App;
