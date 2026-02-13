// // =============================================
// // Middleware - Confetteria Scalese
// // =============================================
// // Proteção de rotas com Clerk.
// // Rotas públicas: home, catálogo, sign-in, sign-up
// // Rotas protegidas: /admin/*

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // Rotas que exigem autenticação
// const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

// // Rotas sempre públicas (auth pages + catálogo)
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/bombons(.*)",
//   "/bolos(.*)",
//   "/combos(.*)",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
//   "/api/public(.*)",
// ]);

// export default clerkMiddleware(async (auth, request) => {
//   // Se é rota protegida, exige login
//   if (isProtectedRoute(request)) {
//     const { userId } = await auth();

//     if (!userId) {
//       const signInUrl = new URL("/sign-in", request.url);
//       signInUrl.searchParams.set("redirect_url", request.url);
//       return NextResponse.redirect(signInUrl);
//     }
//   }
// });

// export const config = {
//   matcher: [
//     // Proteger tudo exceto arquivos estáticos
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Sempre rodar em rotas de API
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};