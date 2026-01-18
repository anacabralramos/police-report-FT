# Registro Policial Móvel 📱

<img width='300' src='https://github.com/user-attachments/assets/80ef66fa-7343-454d-b9d1-c395eb5fa6cd'/>
<img width='300' src='https://github.com/user-attachments/assets/da2ef901-ec3f-4686-a500-55cdcdf0782b'/>
<img width='300' src='https://github.com/user-attachments/assets/ca64b171-ac1d-4a6e-b4e3-7049979a07bf'/>


## ✨ Features

- 🔍 **Busca Multi-Critério**: Filtro por CPF com máscara inteligente e remoção automática de caracteres especiais.
    - Busca por Nome utilizando lógica fonética via RPC no PostgreSQL (ignora acentos e variações de escrita).
- 📂 **Carregamento Infinito (Infinite Scroll)**: Listagem de registros otimizada que carrega novos dados conforme a rolagem, economizando memória do dispositivo e tráfego de dados.
- ⚡ **Visualização Instantânea**: Graças à integração do cache entre queries, os detalhes do indivíduo abrem sem atraso visual, utilizando os dados pré-carregados da lista.
- 🖼️ **Gestão Inteligente de Mídia**: Upload múltiplo de fotos com compressão e pré-visualização. Tratamento automático de caminhos de arquivos para garantir que fotos novas e antigas coexistam perfeitamente.
- 📍 **Localização Facilitada (GPS)**: Preenchimento automático do endereço da ocorrência via coordenadas do GPS, reduzindo o tempo de digitação e erros de registro.
- 🔐 **Segurança Policial**: Sistema blindado com Row Level Security (RLS), garantindo que apenas policiais autenticados visualizem ou editem informações sensíveis.
- 📡 **Sincronização em Background**: O estado dos dados é revalidado silenciosamente, garantindo que o policial sempre veja a última atualização do sistema sem travar a interface.



## 🛠️ Technologies Used

- **React Native com Expo**
- **TanStack Query v5** - cache e sincronização
- **Supabase+** - banco, auth e storage
- **React Navigation** - navegação
- **Zustand** - estado global
- **TypeScript** - tipagem estática

## 🚀 Otimizações com TanStack Query (v5)
- **Initial Data Pre-fetching**: Ao navegar para a tela de detalhes, o app "pesca" os dados já existentes no cache da listagem (useInfiniteQuery). Isso permite que o policial veja as informações instantaneamente, sem telas de carregamento (Zero-delay UI).
- **Stale-While-Revalidate**: Configuramos um staleTime estratégico para que os dados sejam servidos do cache imediatamente, enquanto uma atualização silenciosa acontece em background para garantir que a informação na rua seja sempre a mais recente.
- **Persistent Cache Recovery**: Implementamos lógica de recuperação para que, mesmo após um update, o cache individual e o cache da lista sejam sincronizados manualmente via setQueryData, evitando requisições desnecessárias ao banco de dados.
- **Automatic Cleanup (GC)**: Gerenciamento inteligente de memória que remove dados antigos do cache após períodos de inatividade, mantendo o app leve mesmo em turnos longos de trabalho.

## 📂 Estrutura do Projeto
```
src/
├── lib/          # Conexão e configurações do Supabase
├── components/   # Componentes UI reutilizáveis (Inputs, Cards, Modais)
├── hooks/        # Lógica de dados e Queries (usePeople, usePersonDetails, etc.)
├── screens/      # Telas principais (Home, Details, Registration)
├── store/        # Gerenciamento de estado global com Zustand
├── navigation/   # Configuração de rotas e Stacks
└── utils/        # Helpers, tratamentos de string e formatação de datas
```


## 📞 Contact
Created by Ana Clara Cabral Ramos.
- Email: ana.clara.2cr@gmail.com
- LinkedIn: [Ana Clara](https://www.linkedin.com/in/ana-clara-cabral-ramos-31aa951a5/)  
- GitHub: [AnaCabralRamos](https://github.com/anacabralramos)
