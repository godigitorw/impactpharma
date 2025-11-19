import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.blogPost.deleteMany()

  const blogPosts = [
    {
      title: "The Importance of Quality Assurance in Pharmaceutical Distribution",
      slug: "quality-assurance-pharmaceutical-distribution",
      excerpt: "Learn how rigorous quality control processes ensure the safety and efficacy of pharmaceutical products throughout the supply chain.",
      image: "https://impactpharma.b-cdn.net/pexels-pietrozj-360622.jpg",
      category: "Quality Control",
      date: "March 15, 2024",
      author: "Dr. Jean Baptiste Uwimana",
      content: JSON.stringify({
        intro: "Quality assurance in pharmaceutical distribution is not just a regulatory requirement—it's a fundamental responsibility that directly impacts patient safety and treatment outcomes.",
        sections: [
          {
            heading: "Understanding Quality Assurance in Distribution",
            paragraphs: [
              "Quality assurance (QA) in pharmaceutical distribution encompasses all activities and procedures designed to ensure that medicines maintain their quality, safety, and efficacy from the manufacturer to the end user.",
              "The pharmaceutical supply chain is complex, involving multiple stakeholders and processes. Each point in this chain represents a potential risk to product quality."
            ]
          }
        ],
        conclusion: "Quality assurance in pharmaceutical distribution is a continuous commitment that requires investment in infrastructure, people, and processes."
      })
    },
    {
      title: "Innovations in Cold Chain Management for Vaccines",
      slug: "innovations-cold-chain-management",
      excerpt: "Discover the latest technologies and best practices in maintaining proper temperature control for vaccine storage and distribution.",
      image: "https://impactpharma.b-cdn.net/pexels-cdc-library-3993241.jpg",
      category: "Logistics",
      date: "March 10, 2024",
      author: "Marie Claire Mukamana",
      content: JSON.stringify({
        intro: "The COVID-19 pandemic highlighted the critical importance of robust cold chain systems in vaccine distribution.",
        sections: [
          {
            heading: "The Cold Chain Challenge",
            paragraphs: [
              "Vaccines are biological products that can lose their potency if exposed to temperatures outside their specified range.",
              "In countries like Rwanda, with diverse geography and varying infrastructure, maintaining the cold chain presents unique challenges."
            ]
          }
        ],
        conclusion: "Innovations in cold chain management are making it possible to safely deliver temperature-sensitive vaccines to more people than ever before."
      })
    },
    {
      title: "Understanding Good Distribution Practices (GDP)",
      slug: "understanding-good-distribution-practices",
      excerpt: "A comprehensive guide to GDP guidelines and how they ensure quality throughout the pharmaceutical supply chain.",
      image: "https://impactpharma.b-cdn.net/pexels-shvetsa-3845129.jpg",
      category: "Compliance",
      date: "March 5, 2024",
      author: "Patrick Nkubito",
      content: JSON.stringify({
        intro: "Good Distribution Practice (GDP) guidelines provide a framework for maintaining quality throughout the pharmaceutical distribution chain.",
        sections: [
          {
            heading: "What is GDP?",
            paragraphs: [
              "Good Distribution Practice (GDP) is a quality system that defines how pharmaceutical products should be stored, transported, and handled throughout the distribution chain.",
              "GDP covers all aspects of distribution including organization and management, personnel, premises and equipment, documentation, operations, quality management."
            ]
          }
        ],
        conclusion: "Good Distribution Practice is not just about regulatory compliance—it's about building a culture of quality that protects patients."
      })
    },
    {
      title: "How to Choose a Reliable Pharmaceutical Wholesale Partner",
      slug: "choose-reliable-pharmaceutical-partner",
      excerpt: "Key factors healthcare facilities should consider when selecting a pharmaceutical distributor for their supply needs.",
      image: "https://impactpharma.b-cdn.net/pexels-julie-viken-148496-593451.jpg",
      category: "Business",
      date: "February 28, 2024",
      author: "Sarah Uwase",
      content: JSON.stringify({
        intro: "Selecting the right pharmaceutical wholesale partner is one of the most important decisions a healthcare facility can make.",
        sections: [
          {
            heading: "Quality Assurance and Regulatory Compliance",
            paragraphs: [
              "The first consideration should always be quality and compliance. Your distributor must maintain proper licensing and comply with Good Distribution Practice (GDP) guidelines.",
              "Request information about their compliance record, including any regulatory inspections or citations."
            ]
          }
        ],
        conclusion: "Choosing a pharmaceutical wholesale partner is a strategic decision that requires careful evaluation."
      })
    },
    {
      title: "The Role of Technology in Modern Pharmaceutical Distribution",
      slug: "technology-pharmaceutical-distribution",
      excerpt: "Exploring how digital solutions are transforming pharmaceutical supply chains and improving efficiency.",
      image: "https://impactpharma.b-cdn.net/pexels-jess-vide-9268926.jpg",
      category: "Technology",
      date: "February 20, 2024",
      author: "Dr. Jean Baptiste Uwimana",
      content: JSON.stringify({
        intro: "Technology is revolutionizing pharmaceutical distribution, making supply chains more efficient, transparent, and reliable.",
        sections: [
          {
            heading: "Automated Inventory Management",
            paragraphs: [
              "Modern inventory management systems use sophisticated algorithms to optimize stock levels, reducing both shortages and excess inventory.",
              "Automated systems can also manage product rotation based on expiry dates, ensuring older stock is distributed first."
            ]
          }
        ],
        conclusion: "Technology is not replacing the human element in pharmaceutical distribution—it's enhancing it."
      })
    },
    {
      title: "Ensuring Medication Safety: From Warehouse to Patient",
      slug: "ensuring-medication-safety",
      excerpt: "An in-depth look at the safety protocols and quality checks that protect patients throughout the medication journey.",
      image: "https://impactpharma.b-cdn.net/pexels-karola-g-6627704.jpg",
      category: "Safety",
      date: "February 15, 2024",
      author: "Patrick Nkubito",
      content: JSON.stringify({
        intro: "Medication safety is a shared responsibility that extends from manufacturers through distributors to healthcare providers and ultimately to patients.",
        sections: [
          {
            heading: "Receipt and Verification",
            paragraphs: [
              "Medication safety begins when products arrive at our warehouse. Every shipment undergoes thorough inspection.",
              "We check each delivery against ordering documentation to ensure we received the correct products in the correct quantities."
            ]
          }
        ],
        conclusion: "Medication safety requires constant vigilance and a commitment to quality at every step of the distribution process."
      })
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post })
  }

  console.log('✅ Database seeded with blog posts')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
