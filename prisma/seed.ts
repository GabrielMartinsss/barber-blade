// eslint-disable-next-line
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    const images = [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1576168056582-0a851a87ab8e?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1598524374912-6b0b0bab43dd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1621645582931-d1d3e6564943?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1598524374668-5d565a3c42e8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1589985523654-936539ff49c0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1634481428939-3b66e6ad4ffb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]

    const creativeNames = [
      'Barbearia Vintage',
      'Corte & Estilo',
      'Barba & Navalha',
      'The Dapper Den',
      'Cabelo & Cia.',
      'Machado & Tesoura',
      'Barbearia Elegance',
      'Aparência Impecável',
      'Estilo Urbano',
      'Estilo Clássico',
    ]

    const telephones = [
      '(11) 98204-5108',
      '(12) 99503-2351',
      '(13) 97543-2221',
      '(44) 95511-8755',
      '(18) 93132-6753',
      '(11) 99503-2351',
      '(12) 94902-6094',
      '(12) 98788-4122',
      '(44) 96239-1283',
      '(11) 98422-1111',
    ]

    const addresses = [
      'Rua da Barbearia, 123',
      'Avenida dos Cortes, 456',
      'Praça da Barba, 789',
      'Travessa da Navalha, 101',
      'Alameda dos Estilos, 202',
      'Estrada do Machado, 303',
      'Avenida Elegante, 404',
      'Praça da Aparência, 505',
      'Rua Urbana, 606',
      'Avenida Clássica, 707',
    ]

    const descriptions = [
      'Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.',
      'Entre no mundo de estilo da Corte & Estilo, onde cada corte de cabelo e barba é uma expressão única de sua personalidade. Aqui, nós elevamos a arte da barbearia para um novo patamar, oferecendo serviços impecáveis em um ambiente acolhedor e descontraído.',
      'Prepare-se para uma experiência excepcional na Barba & Navalha, onde a tradição se encontra com a inovação. Nossos habilidosos barbeiros combinam técnicas clássicas com um toque moderno para criar looks que exalam confiança e estilo.',
      'Bem-vindo ao The Dapper Den, o refúgio definitivo para o cavalheiro moderno. Aqui, cada corte e barba é realizado com precisão meticulosa, resultando em uma aparência impecável que reflete sua sofisticação e bom gosto.',
      'Em Cabelo & Cia., cada visita é uma jornada de transformação. Nossa equipe de profissionais talentosos está aqui para ajudá-lo a alcançar o visual dos seus sonhos, oferecendo cortes e barbas que refletem sua personalidade única em um ambiente descontraído e acolhedor.',
      'No Machado & Tesoura, a excelência é a nossa marca registrada. Nossa equipe de barbeiros experientes está aqui para fornecer a você serviços de primeira classe, garantindo que cada corte e barba seja executado com maestria para um resultado verdadeiramente impressionante.',
      'Descubra um novo padrão de excelência na Barbearia Elegance, onde cada detalhe é cuidadosamente elaborado para satisfazer seus desejos de estilo. Nossa equipe talentosa está comprometida em fornecer serviços de qualidade superior em um ambiente luxuoso e acolhedor.',
      'Na Aparência Impecável, a arte da barbearia é levada a sério. Nossa equipe de mestres barbeiros está aqui para oferecer a você uma experiência única, onde cada corte e barba é executado com precisão cirúrgica para garantir uma aparência impecável em todos os momentos.',
      'Entre no mundo do Estilo Urbano, onde a criatividade e a autenticidade se encontram. Nossa equipe de especialistas em cortes e barbas está aqui para ajudá-lo a expressar sua individualidade, oferecendo serviços personalizados em um ambiente moderno e vibrante.',
      'Descubra a elegância intemporal na Barbearia Estilo Clássico, onde o charme do passado se une ao estilo contemporâneo. Nossos experientes barbeiros estão dedicados a fornecer serviços excepcionais que deixam você com uma aparência e sensação de confiança incomparáveis.',
    ]

    const services = [
      {
        name: 'Corte de Cabelo',
        description: 'Estilo personalizado com as últimas tendências.',
        price: 60.0,
        imageUrl:
          'https://images.unsplash.com/photo-1589985494639-69e60c82cab2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Barba',
        description: 'Modelagem completa para destacar sua masculinidade.',
        price: 40.0,
        imageUrl:
          'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Pézinho',
        description: 'Acabamento perfeito para um visual renovado.',
        price: 35.0,
        imageUrl:
          'https://images.unsplash.com/photo-1514336937476-a5b961020a5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Sobrancelha',
        description: 'Expressão acentuada com modelagem precisa.',
        price: 20.0,
        imageUrl:
          'https://images.unsplash.com/photo-1525797958722-0b6be58a1665?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Hidratação',
        description: 'Hidratação profunda para cabelo e barba.',
        price: 25.0,
        imageUrl:
          'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ]

    const ratings = [5, 4, 2, 3, 5, 4, 5, 4, 3, 4]

    // create 10 barbershops
    const barbershops = []
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]
      const imageUrl = images[i]
      const telephone = telephones[i]
      const description = descriptions[i]

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl,
          description,
          telephone,
        },
      })

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        })
      }

      // add rating in barbershop
      await prisma.rating.create({
        data: {
          value: ratings[i],
          barbershopId: barbershop.id,
        },
      })

      barbershops.push(barbershop)
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect()
  } catch (error) {
    console.error('Erro ao criar as barbearias:', error)
  }
}

seedDatabase()
