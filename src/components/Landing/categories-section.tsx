import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export function CategoriesSection() {
  const categories = [
    {
      id: "ruang-tanggap",
      name: "Ruang Tanggap",
      description: "Bantuan darurat untuk korban bencana alam dan situasi krisis",
      icon: "🚨",
      count: "15 Program",
      gradient: "bg-gradient-to-br from-red-500 to-orange-500",
      examples: ["Bantuan Bencana", "Dana Darurat", "Rehabilitasi"]
    },
    {
      id: "ruang-asa", 
      name: "Ruang Asa",
      description: "Beasiswa dan bantuan pendidikan untuk masa depan yang cerah",
      icon: "🎓",
      count: "28 Program", 
      gradient: "bg-gradient-to-br from-blue-500 to-purple-500",
      examples: ["Beasiswa KIP", "Bantuan PIP", "Dana Pendidikan"]
    },
    {
      id: "ruang-usaha",
      name: "Ruang Usaha", 
      description: "Dukungan UMKM dan bantuan modal usaha untuk ekonomi kerakyatan",
      icon: "💼",
      count: "22 Program",
      gradient: "bg-gradient-to-br from-green-500 to-teal-500", 
      examples: ["KUR Mikro", "Bantuan UMKM", "Modal Kerja"]
    },
    {
      id: "ruang-bertumbuh",
      name: "Ruang Bertumbuh",
      description: "Donasi publik dan program pengembangan masyarakat berkelanjutan", 
      icon: "🌱",
      count: "12 Program",
      gradient: "bg-gradient-to-br from-yellow-500 to-amber-500",
      examples: ["PKH", "Bantuan Sembako", "Program Desa"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ruang <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Kebaikan</span> Indonesia
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bantuan sosial yang terkategorisasi dengan humanis, 
            memudahkan Anda menemukan dukungan yang tepat
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${category.gradient} bg-opacity-10 dark:bg-opacity-20`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.examples.map((example, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline"
                          className="text-xs bg-white/50 dark:bg-gray-800/50"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/scheme-finder?category=${category.id}`}>
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30">
                        Jelajahi Program →
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}