import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTemplates = [
  {
    name: '1. Welcome & Meeting Confirmation',
    subject: 'Confirmed: Your Discovery Call with NorthFlow',
    body: `Hi [Name],\n\nYour discovery call is officially booked for [Time]. I am really looking forward to learning more about [Company] and discussing how we can help you scale.\n\nHere is the Google Meet link: [MeetLink]\n\nPlease come prepared with any specific goals or bottlenecks you'd like to address.\n\nTalk soon,\nRavi Sharma\nNorthFlow`
  },
  {
    name: '2. Post-Meeting Follow Up',
    subject: 'Great speaking with you, [Name]!',
    body: `Hi [Name],\n\nIt was great speaking with you today about [Company]. I loved hearing about your vision.\n\nAs promised, I'll be putting together a custom proposal outlining exactly how NorthFlow can help you achieve your goals over the next few months.\n\nExpect that in your inbox within the next 48 hours. Let me know if you have any immediate questions in the meantime!\n\nBest,\nRavi Sharma`
  },
  {
    name: '3. Proposal Sent',
    subject: 'Action Required: Your Custom NorthFlow Proposal',
    body: `Hi [Name],\n\nI have finished putting together your custom proposal and strategy roadmap for [Company].\n\nI believe this approach will yield the highest ROI for you. Please review the attached document and let me know if everything looks aligned with your expectations.\n\nOnce you give the green light, we can move straight into onboarding!\n\nLooking forward to working together.\n\nRavi Sharma`
  },
  {
    name: '4. Checking In (No Response)',
    subject: 'Checking in on your proposal',
    body: `Hi [Name],\n\nJust floating this to the top of your inbox. Did you get a chance to review the proposal I sent over earlier this week?\n\nLet me know if you want to hop on a quick 10-minute call to review it together and answer any questions.\n\nBest,\nRavi Sharma`
  }
];

async function seed() {
  console.log('Seeding default email templates...');
  for (const t of defaultTemplates) {
    const exists = await prisma.emailTemplate.findUnique({ where: { name: t.name } });
    if (!exists) {
      await prisma.emailTemplate.create({ data: t });
      console.log(`Created template: ${t.name}`);
    } else {
      console.log(`Template already exists: ${t.name}`);
    }
  }
  console.log('Seeding complete!');
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
