import FeatureCard from "@/components/FeatureCard";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { MessageCircle, Shield, Video } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#ffffff] font-DMsemi px-6 md:px-12">
      <Header />
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 md:px-12 gap-7">
        <div className="max-w-4xl space-y-6 md:space-y-6 relative">
          <h1 className="text-4xl md:text-7xl font-DMbold text-gray-800 leading-none">
            Connect Faster <br /> Chat Smarter!
          </h1>
          <p className="text-lg max-w-2xl leading-snug md:text-xl font-DMregular text-gray-800">
            the modern messaging solution for teams that combines lightning fast
            chat and crystal clear video calls in one seamless experience.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                size="lg"
                className="w-full px-8 py-6 md:w-auto text-xl cursor-pointer rounded-xl"
              >
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            Trusted by thousands of users worldwide
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 text-muted-foreground">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm">Active Users</div>
            </div>
          </div>

          <div className="w-px h-8 bg-border" />

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">1M+</div>
            <div className="text-sm">Messages Sent</div>
          </div>

          <div className="w-px h-8 bg-border" />

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">99.9%</div>
            <div className="text-sm">Uptime</div>
          </div>
        </div>
      </div>

      {/* Enhanced features section */}
      <div className="w-full max-w-6xl">
        {/* Section divider */}
        <div className="w-full flex items-center justify-center mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Everything you need to stay connected
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed for seamless communication, whether you are
          chatting with friends or collaborating with teams.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 justify-items-center px-2">
        <FeatureCard
          icon={MessageCircle}
          title="Instant Messaging"
          description="Lightning-fast messages with real-time delivery. Chat with friends and colleagues seamlessly."
        />

        <FeatureCard
          icon={Video}
          title="HD Video Calls"
          description="Crystal-clear video calls with one click. Perfect quality for personal chats and team meetings."
        />

        <FeatureCard
          icon={Shield}
          title="Privacy First"
          description="End-to-end encryption keeps your conversations private. Your data belongs to you, always."
        />
      </div>

      {/* Enhanced CTA Section */}
      <div className="w-full max-w-5xl mx-auto my-28">
        <div className="w-full rounded-2xl border p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to transform your conversations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who have already discovered a better way to
            communicate. Start your journey with Beam today - its completely
            free.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="text-lg px-8 py-6 h-auto cursor-pointer rounded-xl"
              >
                Get Started Free
              </Button>
            </SignUpButton>
          </div>

          <div className="flex justify-center flex-col sm:flex-row items-center gap-3 md:gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Free forever plan
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Setup in 30 seconds
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex md:flex-col gap-8 md:gap-0">
              <span className="text-xl md:text-3xl font-bold tracking-tight">
                Beamy
              </span>
              <p className="text-sm md:text-lg text-muted-foreground mt-1">
                The future of communication
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Beam. This is a Demo. We have no affiliation with any of the
            brands mentioned in the video including Beam, any usage is purely
            educational, in the event of any infringement, please contact us and
            we will remove/alter the content immediately.
          </p>
        </div>
      </footer>
    </main>
  );
}
