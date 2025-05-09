import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function FunnelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeJourney = async () => {
    setIsLoading(true);
    try {
      const prompt = `Analyze this customer awareness funnel for Álibis Digital:
      
1. Unconscious: The audience doesn't know they have a problem yet.
2. Problem Aware: They understand there's a problem but don't know how to solve it.
3. Solution Aware: They know solutions exist, but don't know about your product yet.
4. Product Aware: They know your product, but are still deciding whether to buy.
5. Most Aware: Ready to buy, just needs a push.

The funnel also includes these offer types:
- Front-End: Low-value offers to generate leads
- Back-End: Medium-value offers from events and products to increase average ticket value
- High-End: High-value offers like mentoring and custom packages

Provide strategic recommendations to optimize this marketing funnel and increase conversions at each stage.`;

      const response = await apiRequest("POST", "/api/openai/generate", {
        prompt,
        model: "gpt-4o"
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const result = await response.json();
      setAnalysis(result.content);
      
      toast({
        title: "Analysis Complete",
        description: "AI analysis of your funnel is ready!",
      });
    } catch (error) {
      console.error("Error analyzing funnel:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not generate funnel analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white">
      <header className="flex items-center p-4 border-b border-white/20">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-md mr-4">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8H22M10 16H22M10 24H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M26 20L22 24L20 22" stroke="#00b894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">Funil de Consciência - Álibis Digital</h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="space-y-8">
          {/* Funnel stages - displayed as vertical blocks on mobile, horizontal on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="bg-[#1b263b] border-none rounded-xl shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Inconsciente</h2>
                <p className="text-gray-300">O público ainda não sabe que tem um problema.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#415a77] border-none rounded-xl shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Consciente do Problema</h2>
                <p className="text-gray-300">Já entende que existe um problema, mas não sabe como resolver.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#778da9] border-none rounded-xl shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Consciente da Solução</h2>
                <p className="text-gray-300">Sabe que há soluções disponíveis, mas ainda não conhece o seu produto.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#e0e1dd] border-none rounded-xl shadow-lg text-black">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Consciente do Produto</h2>
                <p className="text-gray-700">Conhece seu produto, mas ainda está decidindo se compra.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#00b894] border-none rounded-xl shadow-lg text-black">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Totalmente Consciente</h2>
                <p className="text-gray-700">Pronto para comprar. Precisa só de um empurrão.</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Offer Journey section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Jornada de Ofertas</h2>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#27ae60]">
                <h3 className="text-xl font-bold mb-2">Front-End</h3>
                <p>Funis de entrada com ofertas de baixo valor para gerar leads.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#2980b9]">
                <h3 className="text-xl font-bold mb-2">Back-End</h3>
                <p>Funis de eventos e produtos de médio valor para aumentar o ticket.</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl border-l-4 border-[#c0392b]">
                <h3 className="text-xl font-bold mb-2">High-End</h3>
                <p>Ofertas de alto valor (mentorias, pacotes personalizados).</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={analyzeJourney}
              disabled={isLoading}
              className="bg-[#00b894] hover:bg-[#00a885] text-black font-bold px-6 py-2 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analisar Sua Jornada de Cliente
                </>
              )}
            </Button>
          </div>
          
          {analysis && (
            <div className="mt-12">
              <Card className="bg-white/5 border-none">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-[#00b894]" />
                    Análise de IA do Funil de Marketing
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-300">
                      {analysis}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
      
      <footer className="text-center p-4 mt-12 text-gray-400 text-sm">
        &copy; 2025 Álibis Digital. Todos os direitos reservados.
      </footer>
    </div>
  );
}