# EHB Franchise Management System

A decentralized franchise ecosystem with revenue sharing, complaint management, and blockchain integration.

## 🚀 Features

### Core Features
- **Franchise Hierarchy**: Sub, Master, and Corporate franchise management
- **Revenue Distribution**: Automatic commission splitting on orders
- **Complaint Management**: 6-hour resolution system with escalation
- **SQL Trust System**: Performance-based trust scoring
- **Blockchain Integration**: EHBGC token and Trusty Wallet support
- **Real-time Dashboard**: Performance analytics and earnings tracking

### Franchise Types
- **Sub-Franchise**: Tehsil/City level operations
- **Master Franchise**: District level (manages 10-25 Sub-Franchises)
- **Corporate Franchise**: Country level management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, bcryptjs
- **Blockchain**: Web3.js, Ethers.js
- **State Management**: React Query
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ehb-franchise.git
   cd ehb-franchise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ehb-franchise
   JWT_SECRET=your-super-secret-jwt-key
   BLOCKCHAIN_RPC_URL=https://mainnet.infura.io/v3/your-project-id
   EHBGC_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/             # Home page components
│   ├── dashboard/        # Dashboard components
│   ├── franchise/        # Franchise components
│   └── providers/        # Context providers
├── pages/                # Page components
│   ├── dashboard/        # Dashboard pages
│   └── franchise/        # Franchise pages
├── services/             # API services
│   ├── api.ts           # Base API configuration
│   ├── franchiseService.ts
│   ├── complaintService.ts
│   └── walletService.ts
├── models/               # MongoDB models
│   ├── Franchise.ts
│   └── Complaint.ts
├── types/                # TypeScript types
│   ├── franchise.ts
│   └── api.ts
├── utils/                # Utility functions
│   └── database.ts
└── constants/            # App constants
```

## 🔧 API Endpoints

### Franchise Management
- `POST /api/franchise/register` - Register new franchise
- `GET /api/franchise/profile/:id` - Get franchise profile
- `PUT /api/franchise/profile/:id` - Update franchise profile
- `GET /api/franchise/income/:id` - Get franchise earnings
- `GET /api/franchise/dashboard/:id` - Get dashboard data

### Complaint Management
- `POST /api/complaints` - Create complaint
- `GET /api/complaints/franchise/:id` - Get franchise complaints
- `PATCH /api/complaints/:id/status` - Update complaint status
- `POST /api/complaints/escalate` - Escalate complaint

### Wallet Integration
- `GET /api/wallet/balance/:address` - Get wallet balance
- `POST /api/wallet/transfer` - Transfer tokens
- `POST /api/wallet/stake` - Stake tokens
- `GET /api/wallet/rewards/:address` - Get rewards

## 🎯 Key Features Implementation

### Revenue Distribution
```typescript
// Automatic commission splitting
const distributeRevenue = (orderAmount: number) => {
  const subFranchiseCut = orderAmount * 0.02    // 2%
  const masterFranchiseCut = orderAmount * 0.01  // 1%
  const corporateFranchiseCut = orderAmount * 0.005 // 0.5%
  // ... distribute to respective wallets
}
```

### Complaint Escalation
```typescript
// 6-hour deadline system
const escalateComplaint = (complaintId: string) => {
  const complaint = await ComplaintModel.findById(complaintId)
  const timeRemaining = complaint.deadline - new Date()

  if (timeRemaining <= 0) {
    await complaint.escalate(parentFranchiseId)
    // Apply SQL penalty
  }
}
```

### SQL Trust System
```typescript
// Performance-based SQL updates
const updateSQL = (franchiseId: string, performance: number) => {
  if (performance > 90) {
    return 'high'
  } else if (performance > 70) {
    return 'medium'
  } else {
    return 'low'
  }
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ehb-franchise
NODE_ENV=production
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint
```

## 📊 Performance Monitoring

- Real-time dashboard updates
- Complaint resolution tracking
- Revenue distribution analytics
- SQL level monitoring
- Blockchain transaction tracking

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@ehb-franchise.com or create an issue in the repository.

## 🔄 Roadmap

- [ ] Validator upgrade system
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced blockchain features
- [ ] AI-powered complaint resolution
- [ ] Real-time notifications
- [ ] Advanced reporting system

---

**Built with ❤️ by EHB Technologies Limited**
