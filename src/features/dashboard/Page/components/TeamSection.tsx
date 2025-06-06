import Image from 'next/image';

export default function TeamSection() {
  const coreTeam = [
    {
      name: 'Khang LÊ',
      role: 'Founder/ Project Lead',
      description: 'Google for Edu Certified Trainer\nYSEALI Professional Fellows',
      image: '/images/team/khang.jpg',
    },
    {
      name: 'Kiệt CHANG',
      role: 'Operation Manager',
      description: 'Coordinator of Vietnam School of Development\nOperation Lead - Books in the City\nYSEALI Professional Fellows',
      image: '/images/team/kiet.jpg',
    },
  ];

  const technicalTeam = [
    'Bùi Thị Tuyết Ngọc',
    'Đoàn Văn Nhân',
    'Võ Nguyễn Đình Quân',
    'Đặng Quốc Hưng',
    'Trần Nguyễn Khang',
  ];

  const marcomTeam = [
    'Tuấn Anh Cao',
    'Bảo Nguyên',
    'Tài Nguyễn',
    'Châu Trương',
    'Vy Lê',
  ];

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-black mb-4">Meet our team 🎓💻</h2>
        <p className="text-gray-700 mb-8">
          We&apos;re a small team of educators with big dreams—using tech to empower learners and close the digital gap.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {coreTeam.map((member, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg border-2 border-black"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black">{member.name}</h4>
                <p className="inline-block border border-black rounded-full px-4 py-1 text-black font-bold my-1">
                  {member.role}
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 mt-8 py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700">
                <span className="text-4xl">💪💪💪</span><br/>
                With a <span className="font-bold">flexible, project-based model</span>, we welcome <br/>
                <span className="text-black bg-[#FFCF24] px-1 rounded font-bold">talented interns and volunteers</span> to grow with us <br/>
                while creating real impact.
              </p>
            </div>
            <div className="w-full h-auto">
              <Image
                src="/images/team/flexible-model.png"
                alt="Flexible model illustration"
                width={200}  
                height={150} 
                className="object-contain w-full max-w-[300px] h-auto rounded-lg" 
              />
            </div>

          </div>
        </div>
      </div>



      <div className="container mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold text-black mb-2">👩‍💻Technical team👨‍💻</h4>
            <ul className="text-gray-700 space-y-1">
              {technicalTeam.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-black mb-2">🔥Marcom & Logistic team🔥</h4>
            <ul className="text-gray-700 space-y-1">
              {marcomTeam.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

  );
}