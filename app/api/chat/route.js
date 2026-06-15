import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai"; // GEMINI IMPORT
import { NextResponse } from "next/server";

import { products } from "@/lib/products";

const productContext = products
  .map((product) => `- ${product.name}: ${product.description}`)
  .join("\n");

function getFallbackAnswer(question) {
  const normalized = question.toLowerCase().trim();

  if (
    normalized.includes("what is kyc") ||
    normalized === "kyc" ||
    (normalized.includes("kyc") && !normalized.includes("video"))
  ) {
    return "KYC stands for Know Your Customer. It is the process financial institutions use to verify a customer’s identity before offering services. In Aryavex’s solution suite, eKYC Solution and Video KYC Solution are the most relevant for digital onboarding.";
  }

  if (
    normalized.includes("difference between ekyc and video kyc") ||
    normalized.includes("ekyc vs video kyc") ||
    (normalized.includes("ekyc") && normalized.includes("video kyc"))
  ) {
    return "eKYC is electronic identity verification, usually based on digital data and document workflows, while Video KYC adds a live video verification layer for stronger remote onboarding. Aryavex supports both through eKYC Solution and Video KYC Solution.";
  }

  if (normalized.includes("ekyc") || normalized.includes("e-kyc")) {
    return "eKYC stands for electronic Know Your Customer. It helps institutions digitally verify customer identity and simplify onboarding journeys without relying fully on physical paperwork. Aryavex offers this through its eKYC Solution.";
  }

  if (normalized.includes("video kyc") || normalized.includes("vkyc")) {
    return "Video KYC is a remote identity verification process where customer verification is completed through a live video interaction. It is useful for digital onboarding when institutions need stronger remote verification. Aryavex offers this through its Video KYC Solution.";
  }

  if (normalized.includes("what is digital banking") || normalized.includes("digital banking")) {
    return "Digital banking means delivering banking services through digital channels such as mobile apps, internet banking, payment systems, and self-service platforms. Aryavex supports this area through solutions like Internet Banking Solution, Mobile Banking + IMPS Switching Solution, and UPI Payment Switch.";
  }

  if (
    normalized.includes("what is onboarding") ||
    normalized.includes("customer onboarding") ||
    normalized.includes("onboarding in banking")
  ) {
    return "Onboarding in banking is the process of bringing a new customer into the institution, including identity verification, documentation, compliance checks, and account setup. For this area, Aryavex eKYC Solution and Video KYC Solution are the most relevant.";
  }

  if (
    normalized.includes("what is upi") ||
    normalized === "upi" ||
    normalized.includes("upi payment switch")
  ) {
    return "UPI stands for Unified Payments Interface. It enables real-time bank-to-bank digital payments. A UPI Payment Switch helps institutions route and manage those transactions securely and at scale. Aryavex offers this through its UPI Payment Switch product.";
  }

  if (
    normalized.includes("what is aeps") ||
    normalized === "aeps" ||
    normalized.includes("aadhaar enabled payment") ||
    normalized.includes("aadhaar-based payment")
  ) {
    return "AePS stands for Aadhaar Enabled Payment System. It supports transactions using Aadhaar-based identity authentication, often for assisted or inclusive banking services. Aryavex supports this through its AePS Switching Solution.";
  }

  if (
    normalized.includes("what is bbps") ||
    normalized.includes("bharat billpay") ||
    normalized.includes("billpay") ||
    normalized.includes("bill payment")
  ) {
    return "BBPS stands for Bharat Bill Payment System. It helps standardize and simplify recurring bill payment and collection workflows. Aryavex supports this through its Bharat BillPay Solution.";
  }

  if (
    normalized.includes("what is imps") ||
    normalized === "imps"
  ) {
    return "IMPS stands for Immediate Payment Service. It allows instant interbank fund transfers. Aryavex supports IMPS-related digital banking journeys through its Mobile Banking + IMPS Switching Solution.";
  }

  if (
    normalized.includes("what is core banking") ||
    normalized === "core banking" ||
    normalized.includes("core banking solution")
  ) {
    return "Core banking refers to the central system used by financial institutions to manage accounts, transactions, and essential banking operations. Aryavex offers this through its Core Banking Solution.";
  }

  if (
    normalized.includes("what is a payment switch") ||
    normalized.includes("payment switch") ||
    normalized.includes("transaction switch")
  ) {
    return "A payment or transaction switch is a system that routes, manages, and orchestrates financial transactions between channels and institutions. Aryavex supports this area through UPI Payment Switch and Financial Transaction Switch.";
  }

  if (
    normalized.includes("what is financial transaction switch") ||
    normalized.includes("financial transaction switch")
  ) {
    return "Financial Transaction Switch is a secure orchestration framework used to manage transaction routing and flow across banking operations. Aryavex offers this through its Financial Transaction Switch product.";
  }

  if (
    normalized.includes("what is payment aggregator") ||
    normalized.includes("payment aggregator") ||
    normalized.includes("merchant payment")
  ) {
    return "A Payment Aggregator helps manage merchant payment collection through a unified digital layer. It is useful for merchant onboarding, payment acceptance, and operational simplification across channels. Aryavex offers this through its Payment Aggregator solution.";
  }

  if (
    normalized.includes("what is wallet") ||
    normalized.includes("wallet platform") ||
    normalized.includes("digital wallet")
  ) {
    return "A digital wallet stores value or supports convenient digital payment experiences for users. Aryavex offers this capability through its Wallet Platform.";
  }

  if (
    normalized.includes("what is internet banking") ||
    normalized.includes("online banking")
  ) {
    return "Internet banking means delivering banking services through web-based customer portals for account access, transactions, and self-service. Aryavex supports this through its Internet Banking Solution.";
  }

  if (
    normalized.includes("mobile banking") ||
    normalized.includes("what is mobile banking")
  ) {
    return "Mobile banking allows customers to access financial services through mobile apps or mobile-led digital channels. Aryavex supports this through its Mobile Banking + IMPS Switching Solution.";
  }

  if (
    normalized.includes("what is fraud risk management") ||
    normalized.includes("fraud monitoring") ||
    normalized.includes("risk management")
  ) {
    return "Fraud risk management refers to monitoring, identifying, and responding to suspicious financial activity to improve institutional control and reduce operational risk. Aryavex supports this through its Fraud Risk Management Solution.";
  }

  if (
    normalized.includes("what is account aggregator") ||
    normalized.includes("account aggregator tsp") ||
    normalized.includes("financial data sharing") ||
    normalized.includes("consent-driven data")
  ) {
    return "An Account Aggregator framework supports secure and consent-driven financial data sharing between institutions and systems. Aryavex supports this through its Account Aggregator TSP solution.";
  }

  if (
    normalized.includes("what is agent banking") ||
    normalized.includes("agent banking")
  ) {
    return "Agent banking extends financial services through agent-led distribution models, helping institutions improve reach and service accessibility. Aryavex supports this through its Agent Banking Solution.";
  }

  if (
    normalized.includes("what is chatbot") ||
    normalized.includes("banking chatbot")
  ) {
    return "A banking chatbot helps automate customer assistance by answering common banking, service, and support queries. Aryavex offers this through its Banking Chatbot solution.";
  }

  if (
    normalized.includes("what is data vault") ||
    normalized.includes("secure storage") ||
    normalized.includes("data protection")
  ) {
    return "A Data Vault is used for secure handling, protection, and storage of important institutional or financial data. Aryavex supports this through its Data Vault Solution.";
  }

  if (
    normalized.includes("which product helps with onboarding") ||
    normalized.includes("product for onboarding")
  ) {
    return "For onboarding-related requirements, Aryavex eKYC Solution and Video KYC Solution are the most relevant products.";
  }

  if (
    normalized.includes("which product helps with payments") ||
    normalized.includes("product for payments")
  ) {
    return "For payments-related requirements, Aryavex solutions such as UPI Payment Switch, Payment Aggregator, Bharat BillPay Solution, and Mobile Banking + IMPS Switching Solution are the most relevant.";
  }

  if (
    normalized.includes("which product helps with fraud") ||
    normalized.includes("product for fraud")
  ) {
    return "For fraud and monitoring-related requirements, Aryavex Fraud Risk Management Solution is the most relevant product.";
  }

  if (
    normalized.includes("which product helps with banking operations") ||
    normalized.includes("product for banking operations")
  ) {
    return "For foundational banking operations, Aryavex Core Banking Solution and Financial Transaction Switch are strong starting points.";
  }

  if (
    normalized.includes("which product helps with merchant") ||
    normalized.includes("product for merchant payments")
  ) {
    return "For merchant payment collection and aggregation, Aryavex Payment Aggregator is the most relevant product.";
  }

  if (
    normalized.includes("which product helps with data sharing") ||
    normalized.includes("product for consent")
  ) {
    return "For consent-driven financial data sharing, Aryavex Account Aggregator TSP is the most relevant product.";
  }

  return "I can help explain KYC, eKYC, Video KYC, UPI, AePS, BBPS, IMPS, onboarding, payment switching, core banking, fraud monitoring, account aggregation, and Aryavex product use cases. Try asking something like 'What is KYC?' or 'Which Aryavex product helps with onboarding?'";
}


const systemPrompt = `You are Aryavex's digital banking assistant.

Only answer questions about:
- digital banking tools
- banking operations
- fintech concepts
- Aryavex solutions and product use cases

Do not provide:
- investment advice
- tax advice
- legal advice
- personal financial recommendations
- compliance guarantees

If a question is outside scope, politely say you can help only with digital banking tools, fintech basics, and Aryavex solutions.

Use this Aryavex product context:
${productContext}

Keep answers simple, clear, practical, and beginner-friendly.`;

export async function POST(request) {
  let message = "";

  try {
    const body = await request.json();
    message = body.message?.trim() || "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // GROQ FIRST
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({
          apiKey: process.env.GROQ_API_KEY
        });

        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ]
        });

        const groqReply = completion.choices?.[0]?.message?.content?.trim();

        if (groqReply) {
          return NextResponse.json({
            reply: groqReply,
            source: "groq"
          });
        }
      } catch (groqError) {
        const groqStatus = groqError?.status || groqError?.response?.status;

        if (groqStatus && groqStatus !== 429) {
          console.error("Groq error:", groqError);
        }
        // continue to Gemini
      }
    }

    // ===== GEMINI START =====
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash"
        });

        const prompt = `${systemPrompt}

User question:
${message}`;

        const result = await model.generateContent(prompt);
        const geminiReply = result.response.text().trim();

        if (geminiReply) {
          return NextResponse.json({
            reply: geminiReply,
            source: "gemini"
          });
        }
      } catch (geminiError) {
        console.error("Gemini error:", geminiError);
        // continue to FAQ fallback
      }
    }
    // ===== GEMINI END =====

    return NextResponse.json({
      reply: getFallbackAnswer(message),
      source: "fallback"
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json({
      reply: getFallbackAnswer(message),
      source: "fallback"
    });
  }
}
