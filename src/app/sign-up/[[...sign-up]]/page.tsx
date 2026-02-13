import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-brand-rose-light/20 to-brand-cream-warm">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-rose/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-chocolate">
            Confetteria{" "}
            <span className="text-gradient-rose">Scalese</span>
          </h1>
          <p className="font-accent text-lg text-brand-rose-dark mt-2">
            Criar conta
          </p>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-elevated rounded-2xl border-0",
            },
          }}
        />
      </div>
    </main>
  );
}
