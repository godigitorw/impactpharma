import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding services...');

  const services = [
    {
      title: 'Pharmaceutical Distribution',
      description: 'Comprehensive distribution services ensuring timely delivery of quality medicines to healthcare facilities across Rwanda.',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800',
      features: JSON.stringify([
        'Wide range of pharmaceutical products',
        'Temperature-controlled storage and transport',
        'Real-time inventory tracking',
        'Nationwide delivery network'
      ]),
      order: 1
    },
    {
      title: 'Cold Chain Management',
      description: 'Specialized handling and storage of temperature-sensitive medications and vaccines with state-of-the-art refrigeration systems.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800',
      features: JSON.stringify([
        '24/7 temperature monitoring',
        'Validated cold storage facilities',
        'Backup power systems',
        'Temperature-controlled vehicles'
      ]),
      order: 2
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes and compliance with Good Distribution Practice (GDP) guidelines.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800',
      features: JSON.stringify([
        'GDP-compliant operations',
        'Regular quality audits',
        'Product authentication verification',
        'Complete traceability systems'
      ]),
      order: 3
    },
    {
      title: 'Inventory Management',
      description: 'Advanced inventory solutions helping healthcare facilities optimize stock levels and reduce waste.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
      features: JSON.stringify([
        'Automated stock management',
        'Expiry date tracking (FEFO)',
        'Demand forecasting',
        'Online ordering platform'
      ]),
      order: 4
    },
    {
      title: 'Emergency Supply',
      description: 'Rapid response services for urgent medication needs and emergency situations.',
      image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=800',
      features: JSON.stringify([
        '24/7 emergency hotline',
        'Express delivery services',
        'Priority order processing',
        'Emergency stock reserves'
      ]),
      order: 5
    },
    {
      title: 'Regulatory Support',
      description: 'Assistance with regulatory compliance and documentation for pharmaceutical products.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800',
      features: JSON.stringify([
        'Import/export documentation',
        'Regulatory compliance guidance',
        'Product registration support',
        'Audit preparation assistance'
      ]),
      order: 6
    }
  ];

  for (const service of services) {
    const created = await prisma.service.create({
      data: service,
    });
    console.log(`Created service: ${created.title}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
