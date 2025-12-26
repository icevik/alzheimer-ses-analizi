YÖNTEM
1. Etik Kurul Onayı
Bu çalışma, Dokuz Eylül Üniversitesi Girişimsel Olmayan Araştırmalar Etik Kurulu onayı alındıktan sonra yürütülecektir. Araştırmada katılımcılardan yazılı aydınlatılmış onam alınacaktır. Tüm veriler anonimleştirilecek ve verilere yalnızca araştırma ekibi erişilebilecektir..
2. Çalışma Tasarımı
Bu araştırma, kesitsel ve karşılaştırmalı bir çalışma olarak planlanmıştır. Alzheimer hastalığı, hafif bilişsel bozukluk (MCI) ve sağlıklı kontroller olmak üzere üç katılımcı grubu yer alacaktır. Katılımcıların sözel anlatım özellikleri (dilsel içerik, ifade tarzı, duygu tonu) ile bilişsel düzeyleri (Mini Mental Durum Değerlendirmesi – MMSE) arasındaki ilişki değerlendirilecektir.
3. Katılımcılar
Katılımcılar, Dokuz Eylül Üniversite hastanesinin nöroloji polikliniğinden sağlanacaktır. Alzheimer ve MCI tanıları, nöroloji uzmanı tarafından doğrulanacaktır. Sağlıklı kontrol grubuna dâhil edilecek bireylerin bilişsel durumları, klinik görüşme ve MMSE testi ile normal sınırlar içinde olduğu doğrulanacaktır. Gruplar arasında yaş ve cinsiyet dağılımının benzer olmasına özen gösterilecektir.
Dahil Olma Kriterleri
55–85 yaş aralığında olmak
Ana dili Türkçe olmak
En az ilkokul mezunu olmak
MMSE skoruna göre ilgili gruba dâhil olma koşulunu karşılamak
Dışlama Kriterleri
Ciddi görme, işitme veya konuşma bozukluğu bulunması
Akut veya kronik nöropsikiyatrik hastalık öyküsü (ör. inme, parkinson, majör depresyon)
Ses kalitesini etkileyebilecek üst solunum yolu enfeksiyonu veya ses kısıklığı
Orta veya şiddetli depresyon/anksiyete belirtileri
MMSE skoru 10’un altında olan bireyler (ileri evre demans)
4. Örneklem Büyüklüğü
Katılımcı sayısı, gönüllü başvuruları ve hastane erişim olanakları dikkate alınarak araştırma süreci boyunca belirlenebilecektir. Gruplar arasında yaş, cinsiyet ve eğitim düzeyi açısından denge sağlanması hedeflenecektir. Her bir grup için (Alzheimer, MCI, kontrol) yeterli temsil gücüne ulaşmak amaçlanmakta; nihai örneklem büyüklüğü, veri kalitesi ve katılım uygunluğu kriterleri doğrultusunda kesinleştirilecektir.
5. Veri Toplama
Katılımcılara biri kaza, diğeri piknik sahnesini betimleyen iki farklı görsel gösterilecektir. Katılımcılardan her iki görseli de serbest biçimde anlatmaları istenecek, ardından kısa ve standart bir metni yüksek sesle okumaları talep edilecektir. Bu görsellerin içerik bakımından farklı duygular uyandırabilmesi, çalışmada önemli bir değişken olarak değerlendirilecektir. Tüm anlatımlar aynı koşullarda ve standart ses düzeyinde kaydedilecektir. Sonrasında Mini Mental Durum Değerlendirme (MMSE) testi uygulanarak bilişsel performans düzeyleri belirlenecektir. Tüm anlatımlar, sessiz ve yankısız bir odada, sabit mikrofon mesafesi (~20 cm) korunarak wav formatında kaydedilecektir. Bu standart koşullar, analizlerin güvenilirliği ve gruplar arası karşılaştırılabilirliğin sağlanması açısından önem taşımaktadır. İlgili hastaların mevcut MMSE skorları çalışmaya dahil edilecektir.
5. Veri Analizi
Ses kayıtlarından elde edilen veriler, içerik ve duygu analizi amacıyla çok aşamalı bir süreçle değerlendirilecektir. Tüm kayıtlar standart koşullarda alınmış .wav formatında olup, analiz öncesi kalite standardizasyonu sağlanacaktır.
İlk aşamada kayıtlar otomatik konuşma tanıma (ASR) sistemi kullanılarak transkribe edilecektir. Elde edilen metinler, anlatımın doğruluğu ve bütünlüğü açısından araştırmacı tarafından kontrol edilecektir.
Transkript metinleri, TTS (Text-to-Speech)  tabanlı duygu analiz modelleri ile işlenerek her anlatımın duygusal profili çıkarılacaktır. Bu adımda metinlerin duygu tonu (pozitif, negatif, nötr) ve yoğunluğu belirlenecek; metin uzunluğu, kelime çeşitliliği ve anlatım biçimi gibi dilsel göstergeler de değerlendirilecektir.
Aynı kayıtlar üzerinden librosa kütüphanesi kullanılarak sesin temel meta verileri (süre, enerji, temel frekans gibi teknik özellikler) çıkarılacaktır. Bu meta veriler, metin tabanlı duygu analizinin sonuçları ile birlikte yorumlanacaktır.
Transkript ve ses meta verileri, araştırmacı tarafından hazırlanan spesifik promptlar aracılığıyla GPT’ye gönderilecek ve her katılımcı için içerik ve duygu raporu oluşturulacaktır. Sonuçlar araştırmacı tarafından doğrulanacak ve çalışmanın karşılaştırmalı analizlerinde kullanılacaktır.
Elde edilen verilerle gruplar arası farklar incelenecektir. Normal dağılım gösteren veriler için ANOVA, normal dağılım göstermeyenler için Kruskal–Wallis testi kullanılacaktır. Gerekirse ikili grup karşılaştırmaları için Mann–Whitney U testi uygulanacaktır. Kodlanmış içerik ve duygu temalarının dağılımları için Khi-kare testi veya Fisher testi kullanılacak, MMSE skorları ile duygu profilleri arasındaki ilişkiler ise korelasyon testleri ile değerlendirilecektir. Tüm analizlerde p < 0.05 istatistiksel anlamlılık olarak kabul edilecektir.
Transkriptler ve ses meta verileri, TTS tabanlı duygu analizi ve içerik değerlendirmesinden sonra Cursor platformu kullanılarak model oluşturma çalışmaları yürütülecektir. Elde edilen modelin ileride bir platforma dönüştürülmesi ve ticari uygulamalara uyarlanması planlanmaktadır.
