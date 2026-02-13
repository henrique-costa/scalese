import { sanitizeString, formatPrice } from "@/lib/utils";

describe("sanitizeString", () => {
  it("deve remover tags HTML", () => {
    expect(sanitizeString("<script>alert('xss')</script>")).toBe("alert(xss)");
  });

  it("deve manter texto normal", () => {
    expect(sanitizeString("Brigadeiro de Chocolate")).toBe(
      "Brigadeiro de Chocolate"
    );
  });

  it("deve manter caracteres acentuados", () => {
    expect(sanitizeString("Confetteria Scalese - São Paulo")).toBe(
      "Confetteria Scalese - São Paulo"
    );
  });

  it("deve remover espaços extras", () => {
    expect(sanitizeString("  Bolo   ")).toBe("Bolo");
  });
});

describe("formatPrice", () => {
  it("deve formatar preço em reais", () => {
    const formatted = formatPrice(5.5);
    expect(formatted).toContain("5,50");
    expect(formatted).toContain("R$");
  });

  it("deve formatar valores maiores", () => {
    const formatted = formatPrice(1250.99);
    expect(formatted).toContain("1.250,99");
  });

  it("deve formatar zero", () => {
    const formatted = formatPrice(0);
    expect(formatted).toContain("0,00");
  });
});
