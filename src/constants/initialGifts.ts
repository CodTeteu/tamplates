import type { Gift } from '../types';

export const INITIAL_GIFTS: Gift[] = [
    // ============ UTENSÍLIOS E COZINHA (GERAL) ============
    { id: '1', name: 'Tábua de carne', price: 25.00, description: 'Tábua resistente para o dia a dia', imageUrl: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=400&q=80', category: 'Cozinha' },
    { id: '2', name: 'Forma de gelo', price: 20.00, description: 'Forma prática para gelo', imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', category: 'Cozinha' },
    { id: '3', name: 'Panos de prato – 10 peças', price: 20.00, description: 'Kit completo de panos', imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80', category: 'Cozinha' },
    { id: '4', name: 'Ralador', price: 19.90, description: 'Ralador multiuso', imageUrl: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&q=80', category: 'Cozinha' },
    { id: '5', name: 'Medidores', price: 19.00, description: 'Conjunto de medidores', imageUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80', category: 'Cozinha' },
    { id: '6', name: 'Processador e Triturador Manual', price: 15.00, description: 'Triturador prático', imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80', category: 'Cozinha' },
    { id: '7', name: 'Açucareiro preto', price: 14.00, description: 'Açucareiro elegante', imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', category: 'Cozinha' },
    { id: '8', name: 'Peneira de plástico', price: 10.00, description: 'Peneira resistente', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', category: 'Cozinha' },
    { id: '9', name: 'Potes de vidro – 6 peças', price: 60.00, description: 'Conjunto de potes herméticos', imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80', category: 'Cozinha' },
    { id: '10', name: 'Moedor de Café Manual Inox', price: 50.00, description: 'Moinho para grãos frescos', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', category: 'Cozinha' },
    { id: '11', name: 'Leiteira', price: 46.00, description: 'Leiteira prática', imageUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&q=80', category: 'Cozinha' },
    { id: '12', name: 'Mantimentos Tampa Trava', price: 45.00, description: 'Potes organizadores', imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80', category: 'Cozinha' },
    { id: '13', name: 'Jogo americano – 6 peças', price: 40.00, description: 'Conjunto elegante para mesa', imageUrl: 'https://images.unsplash.com/photo-1603199506016-5d693c95ed8e?w=400&q=80', category: 'Cozinha' },
    { id: '14', name: 'Jogo de copos', price: 40.00, description: 'Copos para uso diário', imageUrl: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&q=80', category: 'Cozinha' },
    { id: '15', name: 'Tigelas', price: 40.00, description: 'Conjunto de tigelas', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', category: 'Cozinha' },
    { id: '16', name: 'Toalha de mesa', price: 40.00, description: 'Toalha elegante', imageUrl: 'https://images.unsplash.com/photo-1603199506016-5d693c95ed8e?w=400&q=80', category: 'Cozinha' },
    { id: '17', name: 'Jogo de Taças Vinho 385ml – 6 Peças', price: 37.29, description: 'Taças Nadir Barone', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80', category: 'Cozinha' },
    { id: '18', name: 'Taça de sobremesa', price: 34.00, description: 'Taças para sobremesa', imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', category: 'Cozinha' },
    { id: '19', name: 'Conjunto de facas – 6 peças', price: 80.00, description: 'Kit de facas completo', imageUrl: 'https://images.unsplash.com/photo-1566454419290-57a64afe1e5b?w=400&q=80', category: 'Cozinha' },
    { id: '20', name: 'Pires e xícaras', price: 92.00, description: 'Conjunto elegante', imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80', category: 'Cozinha' },
    { id: '21', name: 'Conjunto de pratos rasos', price: 78.00, description: 'Pratos para o dia a dia', imageUrl: 'https://images.unsplash.com/photo-1603199506016-5d693c95ed8e?w=400&q=80', category: 'Cozinha' },
    { id: '22', name: 'Espátula de silicone', price: 15.00, description: 'Espátula flexível', imageUrl: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=400&q=80', category: 'Cozinha' },
    { id: '23', name: 'Colher medidora 5 peças', price: 18.00, description: 'Kit de medidores', imageUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80', category: 'Cozinha' },
    { id: '24', name: 'Descascador de legumes', price: 10.00, description: 'Descascador prático', imageUrl: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&q=80', category: 'Cozinha' },
    { id: '25', name: 'Suporte para panelas', price: 25.00, description: 'Organizador de panelas', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', category: 'Cozinha' },
    { id: '26', name: 'Batedor de claras', price: 12.00, description: 'Batedor manual', imageUrl: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=80', category: 'Cozinha' },
    { id: '27', name: 'Porta-guardanapos', price: 18.00, description: 'Porta-guardanapos elegante', imageUrl: 'https://images.unsplash.com/photo-1603199506016-5d693c95ed8e?w=400&q=80', category: 'Cozinha' },
    { id: '28', name: 'Copo medidor', price: 17.00, description: 'Copo com medidas', imageUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80', category: 'Cozinha' },
    { id: '29', name: 'Kit descanso panela', price: 32.00, description: 'Proteção para a mesa', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', category: 'Cozinha' },

    // ============ ELETRO E PREPARO ============
    { id: '30', name: 'Cafeteira Dolce Mondial', price: 99.00, description: 'Café expresso em casa', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', category: 'Eletro' },
    { id: '31', name: 'Espremedor elétrico Britânia', price: 80.00, description: 'Sucos naturais fáceis', imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', category: 'Eletro' },
    { id: '32', name: 'Panela Wok Antiaderente', price: 60.00, description: 'Para receitas orientais', imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', category: 'Eletro' },
    { id: '33', name: 'Garrafa térmica', price: 49.90, description: 'Mantém a temperatura', imageUrl: 'https://images.unsplash.com/photo-1570570876889-c8aad57c8c04?w=400&q=80', category: 'Eletro' },
    { id: '34', name: 'Panela de pressão elétrica', price: 300.00, description: 'Praticidade na cozinha', imageUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&q=80', category: 'Eletro' },
    { id: '35', name: 'Jarra elétrica preta', price: 60.00, description: 'Água quente rápido', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', category: 'Eletro' },

    // ============ BANHEIRO ============
    { id: '36', name: 'Jogo de toalhas', price: 90.00, description: 'Toalhas macias e felpudas', imageUrl: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=400&q=80', category: 'Banheiro' },
    { id: '37', name: 'Jogo de Tapetes Antiderrapante', price: 30.00, description: 'Secagem rápida', imageUrl: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80', category: 'Banheiro' },
    { id: '38', name: 'Toalha de banho avulsa', price: 30.00, description: 'Toalha macia', imageUrl: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=400&q=80', category: 'Banheiro' },
    { id: '39', name: 'Kit banheiro', price: 25.00, description: 'Acessórios essenciais', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', category: 'Banheiro' },
    { id: '40', name: 'Toalha de rosto avulsa', price: 25.00, description: 'Toalha de rosto', imageUrl: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=400&q=80', category: 'Banheiro' },
    { id: '41', name: 'Cesto para banheiro', price: 30.00, description: 'Organizador prático', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', category: 'Banheiro' },

    // ============ UTENSÍLIOS (CASA) ============
    { id: '42', name: 'Ferro de Passar Seco e Vapor', price: 99.00, description: 'Roupas sempre alinhadas', imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80', category: 'Utensílios' },
    { id: '43', name: 'Robô aspirador', price: 120.00, description: 'Limpeza inteligente', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Utensílios' },
    { id: '44', name: 'Caixa organizadora - 4 Peças', price: 55.00, description: 'Organização perfeita', imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80', category: 'Utensílios' },
    { id: '45', name: 'Cadeira de praia', price: 60.00, description: 'Relaxamento garantido', imageUrl: 'https://images.unsplash.com/photo-1562977308-fd2f9e70c5ea?w=400&q=80', category: 'Utensílios' },

    // ============ LUA DE MEL ============
    { id: '46', name: 'Diária em Hotel (2 pessoas)', price: 600.00, description: 'Uma noite especial em Gramado', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', category: 'Lua de Mel' },
    { id: '47', name: 'Café colonial (1 pessoa)', price: 100.00, description: 'Experiência gastronômica', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', category: 'Lua de Mel' },
    { id: '48', name: 'Fondue em Gramado (1 pessoa)', price: 59.90, description: 'Delícia serrana', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', category: 'Lua de Mel' },
    { id: '49', name: 'Tirolesa e Arvorismo', price: 55.00, description: 'Aventura em Gramado', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80', category: 'Lua de Mel' },
    { id: '50', name: 'Vale spa ou massagem (1 pessoa)', price: 55.00, description: 'Relaxamento total', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80', category: 'Lua de Mel' },
    { id: '51', name: 'Passeios para lua de mel', price: 50.00, description: 'Cada passeio especial', imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', category: 'Lua de Mel' },
    { id: '52', name: 'Experiência de vinícola', price: 40.00, description: 'Degustação de vinhos', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80', category: 'Lua de Mel' },

    // ============ SALA ============
    { id: '53', name: 'Cortina gaze linho 4m x 2,70', price: 275.00, description: 'Elegância com forro', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80', category: 'Sala' },
    { id: '54', name: 'Luminária abajur de chão Bivolt', price: 120.00, description: 'Iluminação aconchegante', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80', category: 'Sala' },
    { id: '55', name: 'Manta para sofá 2,10 x 1,20', price: 80.00, description: 'Conforto e estilo', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', category: 'Sala' },
    { id: '56', name: 'Centro de mesa/Decoração', price: 46.00, description: 'Toque especial na decoração', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80', category: 'Sala' },
    { id: '57', name: 'Almofada', price: 20.00, description: 'Conforto extra', imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80', category: 'Sala' },

    // ============ QUARTO ============
    { id: '58', name: 'Cabides 50 peças', price: 42.00, description: 'Organização do guarda-roupa', imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80', category: 'Quarto' },
    { id: '59', name: 'Organizador de sapatos', price: 40.00, description: 'Sapatos sempre organizados', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Quarto' },
    { id: '60', name: 'Jogo de lençol Queen 400 Fios', price: 150.00, description: '4 peças de alta qualidade', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', category: 'Quarto' },
    { id: '61', name: 'Travesseiro simples', price: 45.00, description: 'Noites confortáveis', imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80', category: 'Quarto' },
    { id: '62', name: 'Jogo de fronhas (2 peças)', price: 28.00, description: 'Fronhas macias', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', category: 'Quarto' },
    { id: '63', name: 'Cortina blackout simples', price: 80.00, description: 'Bloqueia a luz', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80', category: 'Quarto' },
    { id: '64', name: 'Protetor de colchão', price: 55.00, description: 'Proteção impermeável', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80', category: 'Quarto' },
    { id: '65', name: 'Mala para viagem', price: 100.00, description: 'Para a lua de mel', imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80', category: 'Quarto' },

    // ============ LAVANDERIA ============
    { id: '66', name: 'Tábua de passar roupa', price: 99.00, description: 'Roupas bem passadas', imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80', category: 'Lavanderia' },
    { id: '67', name: 'Secadora Fischer 8 Kg', price: 300.00, description: 'Super Ciclo eficiente', imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80', category: 'Lavanderia' },
    { id: '68', name: 'Prendedores', price: 10.00, description: 'Kit de prendedores', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Lavanderia' },
    { id: '69', name: 'Vassoura simples', price: 28.00, description: 'Limpeza básica', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Lavanderia' },
    { id: '70', name: 'Lixeira preta ou inox', price: 49.00, description: 'Lixeira elegante', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Lavanderia' },
    { id: '71', name: 'Cesto para roupas sujas', price: 50.00, description: 'Organização da lavanderia', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Lavanderia' },
    { id: '72', name: 'Varal de roupa íntima', price: 44.00, description: 'Varal prático', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'Lavanderia' },
];
