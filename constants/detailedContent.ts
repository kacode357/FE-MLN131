// constants/detailedContent.ts

export interface Section {
  title: string
  content: string
}

export interface LessonContent {
  title: string
  sections: Section[]
}

export type LanguageContent = Record<string, LessonContent>

export type DetailedContent = {
  vi: LanguageContent
  en: LanguageContent
  ja: LanguageContent
}

export const detailedContent: DetailedContent = {
  vi: {
    // I. Chủ nghĩa xã hội
    "chu-nghia-xa-hoi": {
      title: "I. Chủ nghĩa xã hội",
      sections: [
        {
          title: "Học thuyết Hình thái kinh tế - xã hội",
          content: `**Học thuyết Hình thái kinh tế - xã hội:**

- Do **C.Mác** và **Ph.Ăngghen** xây dựng, nghiên cứu lịch sử xã hội, nhất là xã hội tư bản, **vạch rõ quy luật vận động xã hội**.
- **Xem xét xã hội** trong quá trình **biến đổi không ngừng**.
- **V.I.Lênin** bổ sung, phát triển và **hiện thực hóa**, trở thành **học thuyết Mác-Lênin**.

**📌 Gợi ý ghi nhớ (tóm tắt nhanh):**
- Học thuyết giúp **nhìn xã hội theo quy luật**, không tĩnh tại.
- Đặt nền cho việc lý giải **vì sao hình thái xã hội thay thế nhau**.
- Dùng để phân tích thực tiễn VN theo **quan điểm duy vật lịch sử**.

![Minh họa](/1.png)`,
        },
        {
          title: "Tính tất yếu lịch sử",
          content: `**Tính tất yếu lịch sử:** Học thuyết chỉ ra **sự thay thế tất yếu** hình thái kinh tế-xã hội **tư bản chủ nghĩa** bằng hình thái kinh tế-xã hội **cộng sản chủ nghĩa**, là một **quá trình lịch sử-tự nhiên**.

**🔎 Điểm nhấn:**
- “Tất yếu” không phải ý muốn chủ quan, mà do **mâu thuẫn nội tại** của TBCN.
- Tiến trình mang tính **lịch sử – tự nhiên**: lâu dài, có bước quanh co, không đồng đều.

`,
        },
        {
          title: "Tiền đề vật chất quan trọng",
          content: `**Tiền đề vật chất quan trọng:** **Sự phát triển của lực lượng sản xuất** và **sự trưởng thành của giai cấp công nhân**.

**🧭 Giải thích nhanh:**
- **Lực lượng sản xuất** = công nghệ, công cụ, tay nghề, năng suất… **bùng nổ** → đòi hỏi QHSX mới phù hợp.
- **Giai cấp công nhân** = lực lượng xã hội **có tổ chức/kỷ luật**, đủ sức **lãnh đạo cách mạng**.

![Minh họa](/3.jpg)`,
        },
        {
          title: "Giai đoạn phát triển",
          content: `**Giai đoạn phát triển:** Hình thái kinh tế-xã hội cộng sản chủ nghĩa phát triển qua **hai giai đoạn**:
- Giai đoạn **thấp** (*chủ nghĩa xã hội*).
- Giai đoạn **cao** (*chủ nghĩa cộng sản*).

**📚 Phân biệt nhanh:**
- *CNXH (thấp)*: còn **dấu vết cũ**, phân phối **chủ yếu theo lao động**, đa sở hữu cùng tồn tại.
- *CNCS (cao)*: **công hữu phát triển**, lực lượng sản xuất rất cao, mục tiêu “**làm theo năng lực, hưởng theo nhu cầu**” (tính lý tưởng).

![Minh họa](/4.jpg)`,
        },
        {
          title: "Thời kỳ quá độ lên chủ nghĩa cộng sản",
          content: `**Thời kỳ quá độ lên chủ nghĩa cộng sản:**

- Là **thời kỳ cải biến cách mạng** giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa.
- Là xã hội **vừa thoát thai từ chủ nghĩa tư bản**, còn **mang nhiều dấu vết của xã hội cũ** (kinh tế, đạo đức, tinh thần).
- **V.I.Lênin nhấn mạnh**: đối với các nước chưa có chủ nghĩa tư bản phát triển cao, cần có **thời kỳ quá độ khá lâu dài** từ chủ nghĩa tư bản lên chủ nghĩa xã hội.

**🧩 Ghi nhớ & ví dụ:**
- Vừa **phá bỏ cái cũ** vừa **xây cái mới** → tất yếu **phức tạp, kéo dài**.
- Nhiệm vụ tiêu biểu: **cải tạo QHSX**, **công nghiệp hóa**, **xây dựng nhà nước kiểu mới**, **nâng cao dân trí, văn hóa**.

![Minh họa](/5.png)`,
        },
      ],
    },

    // II. Điều kiện ra đời của chủ nghĩa xã hội
    "dieu-kien-ra-doi": {
      title: "II. Điều kiện ra đời của chủ nghĩa xã hội",
      sections: [
        {
          title: "Cơ sở lí luận",
          content: `**Cơ sở lí luận**

- **Mác và Ăngghen**: Chủ nghĩa xã hội **không tự nhiên xuất hiện**, mà là **kết quả phát triển và mâu thuẫn** trong lòng xã hội tư bản.
- **Lênin**: Chủ nghĩa cộng sản **nảy sinh từ chủ nghĩa tư bản**, gắn liền với **sự ra đời của giai cấp công nhân hiện đại**.

**🧠 Ý nghĩa học thuật:**
- CNXH là **sản phẩm của lịch sử**, không phải mô hình áp đặt.
- **Đối tượng trung tâm**: giai cấp công nhân và **liên minh** với các lực lượng lao động.

![Minh họa](/9.png)`,
        },
        {
          title: "Điều kiện kinh tế",
          content: `**Điều kiện kinh tế**

- **Lực lượng sản xuất** phát triển cao nhờ **cách mạng công nghiệp**.
- **Mâu thuẫn gay gắt** giữa lực lượng sản xuất **mang tính xã hội hóa** với **quan hệ sản xuất dựa trên chiếm hữu tư nhân** → quan hệ sản xuất trở thành **“xiềng xích”**.
- **Chính mâu thuẫn này** tất yếu dẫn đến **yêu cầu thay đổi quan hệ sản xuất** – tức là phải **ra đời một hình thái kinh tế mới**.
- *Ví dụ:* giống như **chiếc áo quá chật**, ban đầu vừa nhưng sau **không còn phù hợp**, cần **một hình thái kinh tế mới**.

**📌 Chốt lại:**
- Khi **LLSX > khuôn khổ QHSX**, xã hội bắt buộc **đổi khuôn** (cải cách/cách mạng).

![Minh họa](/6.png)`,
        },
        {
          title: "Điều kiện chính trị – xã hội",
          content: `**Điều kiện chính trị – xã hội**

- **Giai cấp công nhân** trưởng thành, đông đảo, **kỷ luật**, **đối lập trực tiếp** với tư sản.
- **Mâu thuẫn giai cấp** ngày càng gay gắt → **đấu tranh kinh tế** biến thành **đấu tranh chính trị**.
- *Ví dụ:* **Cách mạng tháng Mười Nga 1917**.
- **Sự ra đời của Đảng Cộng sản** – **đội tiên phong**, **tổ chức và lãnh đạo phong trào**, như “**huấn luyện viên**” dẫn dắt đội bóng.

**🧭 Kết luận nhanh:**
- CNXH **không tự nảy sinh**, mà qua **đấu tranh giai cấp** dưới **sự lãnh đạo của Đảng tiên phong**.

![Minh họa](/7.png)`,
        },
        {
          title: "Ý nghĩa và thực tiễn",
          content: `**Ý nghĩa và thực tiễn**

- **Sự phát triển của lực lượng sản xuất + giai cấp công nhân** → **tạo tiền đề** cho CNXH.
- **Nhưng chỉ** cách mạng vô sản **dưới sự lãnh đạo của Đảng Cộng sản** mới **biến tiềm năng thành hiện thực**.
- **Lịch sử chứng minh:** **Nga 1917** và **Trung Quốc 1949** là **minh chứng điển hình**.

**✅ Nhớ nhanh:**
- Có **tiền đề** chưa đủ → cần **điều kiện chính trị** và **lãnh đạo đúng đắn**.

![Minh họa](/8.png)`,
        },
      ],
    },

    // III. Những đặc trưng bản chất của chủ nghĩa xã hội
    "dac-trung-ban-chat": {
      title: "III. Những đặc trưng bản chất của chủ nghĩa xã hội",
      sections: [
        {
          title: "Giới thiệu",
          content: `**Mở đầu:** Theo chủ nghĩa **Mác - Lênin** và các tài liệu giáo khoa Việt Nam, **chủ nghĩa xã hội có 6 đặc trưng bản chất**, phản ánh **sự ưu việt** so với chủ nghĩa tư bản.

**🎯 Mục đích học phần:**
- Nắm **ý nghĩa từng đặc trưng**, liên hệ **thực tiễn Việt Nam**.

![Minh họa](/10.png)`,
        },
        {
          title: "Giải phóng giai cấp, giải phóng dân tộc, giải phóng xã hội, phát triển toàn diện con người",
          content: `**Nội dung:** Đây là **bản chất cốt lõi** của chủ nghĩa xã hội, nhằm **xóa bỏ tình trạng bóc lột giai cấp**, **giải phóng nhân dân lao động** khỏi áp bức và bất công. Chủ nghĩa xã hội **thúc đẩy sự phát triển tự do, toàn diện** về thể chất, tinh thần và đạo đức của con người, giúp con người không còn bị **tha hóa** như trong chủ nghĩa tư bản mà **trở thành chủ thể sáng tạo** của lịch sử.

**Liên hệ thực tiễn ở Việt Nam:** Đảng Cộng sản Việt Nam xác định mục tiêu xây dựng chủ nghĩa xã hội với phương châm **"dân giàu, nước mạnh, dân chủ, công bằng, văn minh"**, hướng tới **phát triển con người toàn diện**.

**📌 Điểm nhấn:**
- Trọng tâm là **con người**: tự do, sáng tạo, phẩm giá.
- Xóa **bóc lột – bất công** → mở đường cho **phát triển toàn diện**.

![Minh họa](/11.png)`,
        },
        {
          title: "Do nhân dân lao động làm chủ",
          content: `**Nội dung:** Nhân dân lao động là **chủ thể** của xã hội xã hội chủ nghĩa, **nắm quyền lực** thông qua nhà nước kiểu mới (**nhà nước của dân, do dân, vì dân**). Điều này được thể hiện qua **nền dân chủ xã hội chủ nghĩa**, nơi mọi quyết định đều phục vụ **lợi ích của nhân dân lao động**. **Đảng Cộng sản lãnh đạo** nhưng **dựa trên ý chí và nguyện vọng của nhân dân**, đảm bảo **quyền làm chủ** được thực thi thông qua các cơ chế như **bầu cử, giám sát** và **tham gia quản lý xã hội**.

**Liên hệ thực tiễn ở Việt Nam:** Việt Nam **xây dựng nhà nước pháp quyền xã hội chủ nghĩa**, với các cơ chế như **Quốc hội, Mặt trận Tổ quốc**, và **các tổ chức chính trị - xã hội** để bảo đảm quyền làm chủ của nhân dân.

**📌 Điểm nhấn:**
- **Dân chủ XHCN** = cơ chế **bảo đảm quyền lực thuộc về nhân dân**.
- Lãnh đạo **đi cùng** sự tham gia, giám sát của nhân dân.

![Minh họa](/12.png)`,
        },
        {
          title: "Có nền kinh tế phát triển cao dựa trên các lực lượng sản xuất hiện đại và chế độ công hữu về tư liệu sản xuất chủ yếu",
          content: `**Nội dung:** Kinh tế xã hội chủ nghĩa dựa trên **chế độ công hữu** (bao gồm **sở hữu nhà nước** và **sở hữu tập thể**) làm **nền tảng**, **kết hợp** với các hình thức sở hữu khác trong **giai đoạn đầu**. Các **lực lượng sản xuất hiện đại** bao gồm **công nghiệp hóa, ứng dụng khoa học - công nghệ và cơ giới hóa**. **Phân phối theo lao động** là **nguyên tắc chính**, đảm bảo **công bằng** dựa trên **đóng góp lao động** của mỗi người. Ở giai đoạn đầu, vẫn tồn tại **nền kinh tế nhiều thành phần** để **thúc đẩy sản xuất**.

**Liên hệ thực tiễn ở Việt Nam:** Việt Nam **phát triển nền kinh tế thị trường định hướng xã hội chủ nghĩa**, trong đó **kinh tế nhà nước giữ vai trò chủ đạo**, **kết hợp** với **kinh tế tư nhân** và **các thành phần kinh tế khác**.

**📌 Điểm nhấn:**
- **Công hữu chủ yếu** + **LLSX hiện đại** = nền tảng vật chất của CNXH.
- **Phân phối theo lao động** tạo **động lực** lẫn **công bằng** ở giai đoạn đầu.

![Minh họa](/13.png)`,
        },
        {
          title: "Phát triển văn hóa, giáo dục, khoa học và công bằng xã hội",
          content: `**Nội dung:** Chủ nghĩa xã hội chú trọng **xây dựng nền văn hóa tiên tiến, đậm đà bản sắc dân tộc**, **nâng cao dân trí** và **đảm bảo công bằng xã hội**. **Giáo dục** và **khoa học** được ưu tiên phát triển để **nâng cao chất lượng nguồn nhân lực** và **thúc đẩy sáng tạo**. **Công bằng xã hội** được thể hiện qua việc **giảm dần chênh lệch giàu nghèo**, **đảm bảo an sinh xã hội** và **tạo cơ hội bình đẳng** cho mọi người.

**Liên hệ thực tiễn ở Việt Nam:** Việt Nam **thúc đẩy phổ cập giáo dục**, **phát triển y tế** và **các chính sách an sinh xã hội** như **xóa đói giảm nghèo, bảo hiểm y tế**, và **hỗ trợ vùng sâu, vùng xa**.

**📌 Điểm nhấn:**
- **Văn hóa – giáo dục – khoa học** là **động lực mềm** của phát triển.
- **An sinh & công bằng** bảo đảm **không ai bị bỏ lại phía sau**.

![Minh họa](/14.png)`,
        },
        {
          title: "Đoàn kết dân tộc và đoàn kết quốc tế",
          content: `**Nội dung:** Chủ nghĩa xã hội đề cao **sự đoàn kết giữa các dân tộc** trong một quốc gia và **giữa các quốc gia** trên thế giới, dựa trên **nguyên tắc bình đẳng, tôn trọng lẫn nhau**. Trong bối cảnh **toàn cầu hóa**, chủ nghĩa xã hội nhấn mạnh **hợp tác quốc tế** để **xây dựng hòa bình, ổn định và phát triển bền vững**.

**Liên hệ thực tiễn ở Việt Nam:** Việt Nam **thực hiện chính sách đại đoàn kết dân tộc**, **hòa hợp các dân tộc thiểu số**, đồng thời **tích cực tham gia** các tổ chức quốc tế như **Liên Hợp Quốc, ASEAN** để **thúc đẩy hợp tác và hòa bình**.

**📌 Điểm nhấn:**
- **Đoàn kết trong – ngoài** là nguồn lực **tổng hợp** của phát triển.
- Tinh thần **hòa bình, hợp tác** gắn với **chủ quyền & lợi ích quốc gia**.

![Minh họa](/15.png)`,
        },
        {
          title: "Có sự lãnh đạo của Đảng Cộng sản",
          content: `**Nội dung:** **Đảng Cộng sản** đóng vai trò **lãnh đạo** trong việc **tổ chức, định hướng và xây dựng** xã hội xã hội chủ nghĩa. Đảng **đại diện cho lợi ích của giai cấp công nhân và nhân dân lao động**, đảm bảo **sự thống nhất** trong **mục tiêu và hành động**. **Sự lãnh đạo của Đảng** là **yếu tố then chốt** để đảm bảo **thắng lợi** của **cách mạng xã hội chủ nghĩa**.

**Liên hệ thực tiễn ở Việt Nam:** **Đảng Cộng sản Việt Nam** là **lực lượng lãnh đạo duy nhất**, **tổ chức thực hiện đường lối đổi mới** và **xây dựng chủ nghĩa xã hội** phù hợp với **điều kiện đất nước**.

**📌 Điểm nhấn:**
- **Vai trò hạt nhân chính trị**: định hướng, huy động, kiểm tra.
- Điều kiện để **thống nhất ý chí – hành động** toàn xã hội.

![Minh họa](/16.png)`,
        },
      ],
    },
  },
  en: {
    // I. Socialism
    "chu-nghia-xa-hoi": {
      title: "I. Socialism",
      sections: [
        {
          title: "The Theory of Socio-Economic Formation",
          content: `**The Theory of Socio-Economic Formation:**

- Developed by **K. Marx** and **F. Engels**, who studied social history, especially capitalist society, to **clarify the laws of social development**.
- **Views society** as a process of **constant transformation**.
- **V.I. Lenin** supplemented, developed, and **materialized** this theory, making it the **Marxist-Leninist theory**.

**📌 Key takeaways (quick summary):**
- The theory helps to **view society according to its laws**, not as a static entity.
- It lays the foundation for explaining **why social formations are replaced**.
- Used to analyze Vietnam's reality from a **historical-materialist perspective**.

![Minh họa](/1.png)`,
        },
        {
          title: "Historical Inevitability",
          content: `**Historical Inevitability:** The theory points out the **inevitable replacement** of the **capitalist** socio-economic formation by the **communist** socio-economic formation, as a **natural-historical process**.

**🔎 Highlights:**
- "Inevitable" is not a subjective desire, but a result of the **internal contradictions** of capitalism.
- The process is **natural-historical**: long-term, with twists and turns, and uneven.

`,
        },
        {
          title: "Important Material Preconditions",
          content: `**Important Material Preconditions:** The **development of productive forces** and the **maturation of the working class**.

**🧭 Quick explanation:**
- **Productive forces** = technology, tools, skills, productivity... **explode** → demand new, appropriate production relations.
- **Working class** = an **organized/disciplined** social force, capable of **leading the revolution**.

![Minh họa](/3.jpg)`,
        },
        {
          title: "Stages of Development",
          content: `**Stages of Development:** The communist socio-economic formation develops through **two stages**:
- The **lower** stage (*socialism*).
- The **higher** stage (*communism*).

**📚 Quick distinction:**
- *Socialism (lower)*: still has **old remnants**, distribution is **primarily based on labor**, multiple ownership forms coexist.
- *Communism (higher)*: **public ownership is highly developed**, productive forces are very high, with the goal of “**from each according to his ability, to each according to his needs**” (an ideal).

![Minh họa](/4.jpg)`,
        },
        {
          title: "The Transitional Period to Communism",
          content: `**The Transitional Period to Communism:**

- Is a **period of revolutionary transformation** between capitalist and communist society.
- It is a society that has **just emerged from capitalism**, and still **carries many vestiges of the old society** (economic, moral, spiritual).
- **V.I. Lenin emphasized**: for countries without highly developed capitalism, there needs to be a **relatively long transitional period** from capitalism to socialism.

**🧩 Memo & example:**
- It's about both **dismantling the old** and **building the new** → inevitably **complex and prolonged**.
- Typical tasks: **reforming production relations**, **industrialization**, **building a new type of state**, **raising public knowledge and culture**.

![Minh họa](/5.png)`,
        },
      ],
    },

    // II. Conditions for the Birth of Socialism
    "dieu-kien-ra-doi": {
      title: "II. Conditions for the Birth of Socialism",
      sections: [
        {
          title: "Theoretical Basis",
          content: `**Theoretical Basis**

- **Marx and Engels**: Socialism **does not appear spontaneously**, but is the **result of development and contradictions** within capitalist society.
- **Lenin**: Communism **arises from capitalism**, linked to the **birth of the modern working class**.

**🧠 Academic Significance:**
- Socialism is a **product of history**, not an imposed model.
- **Central subjects**: the working class and its **alliance** with other working people.

![Minh họa](/9.png)`,
        },
        {
          title: "Economic Conditions",
          content: `**Economic Conditions**

- **Productive forces** develop to a high level thanks to the **industrial revolution**.
- **Sharp contradictions** arise between the **socialized nature** of productive forces and the **production relations based on private ownership** → production relations become **"chains"**.
- **This very contradiction** inevitably leads to the **demand for a change in production relations** – meaning the **birth of a new economic formation**.
- *Example:* like a **jacket that's too tight**, initially it fits, but later it's **no longer suitable**, a **new economic formation** is needed.

**📌 To sum up:**
- When **productive forces > the framework of production relations**, society is forced to **change the mold** (reform/revolution).

![Minh họa](/6.png)`,
        },
        {
          title: "Political – Social Conditions",
          content: `**Political – Social Conditions**

- The **working class** matures, becomes numerous, **disciplined**, and in **direct opposition** to the bourgeoisie.
- **Class contradictions** become increasingly sharp → **economic struggles** turn into **political struggles**.
- *Example:* the **Russian October Revolution of 1917**.
- **The birth of the Communist Party** – the **vanguard**, which **organizes and leads the movement**, like a **"coach"** guiding a team.

**🧭 Quick conclusion:**
- Socialism **does not arise on its own**, but through **class struggle** under the **leadership of the vanguard Party**.

![Minh họa](/7.png)`,
        },
        {
          title: "Meaning and Reality",
          content: `**Meaning and Reality**

- The **development of productive forces + the working class** → **creates the precondition** for socialism.
- **But only** a proletarian revolution **under the leadership of the Communist Party** can **turn potential into reality**.
- **History proves:** **Russia in 1917** and **China in 1949** are **typical examples**.

**✅ Quick reminder:**
- Having **preconditions** is not enough → **political conditions** and **correct leadership** are needed.

![Minh họa](/8.png)`,
        },
      ],
    },

    // III. The Essential Characteristics of Socialism
    "dac-trung-ban-chat": {
      title: "III. The Essential Characteristics of Socialism",
      sections: [
        {
          title: "Introduction",
          content: `**Introduction:** According to **Marxist-Leninist** theory and Vietnamese textbooks, **socialism has 6 essential characteristics**, reflecting its **superiority** over capitalism.

**🎯 Purpose of this section:**
- Grasp the **meaning of each characteristic**, and relate them to **Vietnam's reality**.

![Minh họa](/10.png)`,
        },
        {
          title: "Liberation of classes, nations, and society; comprehensive human development",
          content: `**Content:** This is the **core essence** of socialism, aiming to **abolish class exploitation** and **liberate the working people** from oppression and injustice. Socialism **promotes free, comprehensive development** of human physical, spiritual, and moral aspects, helping people to no longer be **alienated** as in capitalism but to **become the creative subject** of history.

**Relation to Vietnam's reality:** The Communist Party of Vietnam defines the goal of building socialism with the motto "**rich people, strong country, democratic, equitable, civilized**," aiming for **comprehensive human development**.

**📌 Highlights:**
- The focus is on **people**: freedom, creativity, dignity.
- Abolishing **exploitation - injustice** → paves the way for **comprehensive development**.

![Minh họa](/11.png)`,
        },
        {
          title: "The working people are masters",
          content: `**Content:** The working people are the **subject** of socialist society, **holding power** through a new type of state (**a state of the people, by the people, for the people**). This is expressed through **socialist democracy**, where all decisions serve the **interests of the working people**. The **Communist Party leads** but **relies on the will and aspirations of the people**, ensuring the **right to be masters** is exercised through mechanisms like **elections, supervision**, and **participation in social management**.

**Relation to Vietnam's reality:** Vietnam is **building a socialist rule-of-law state**, with mechanisms like the **National Assembly, the Vietnam Fatherland Front**, and **political-social organizations** to ensure the people's right to be masters.

**📌 Highlights:**
- **Socialist democracy** = a mechanism to **ensure power belongs to the people**.
- Leadership **goes hand-in-hand** with the people's participation and supervision.

![Minh họa](/12.png)`,
        },
        {
          title: "Has a highly developed economy based on modern productive forces and public ownership of key means of production",
          content: `**Content:** The socialist economy is based on **public ownership** (including **state ownership** and **collective ownership**) as its **foundation**, **combined** with other forms of ownership in the **initial stage**. Các **lực lượng sản xuất hiện đại** bao gồm **công nghiệp hóa, ứng dụng khoa học - công nghệ và cơ giới hóa**. **Distribution according to labor** is the **main principle**, ensuring **fairness** based on each person's **labor contribution**. In the initial stage, a **multi-component economy** still exists to **promote production**.

**Relation to Vietnam's reality:** Vietnam is **developing a socialist-oriented market economy**, in which the **state economy plays the leading role**, **combined** with the **private economy** and **other economic sectors**.

**📌 Highlights:**
- **Primary public ownership** + **modern productive forces** = the material foundation of socialism.
- **Distribution according to labor** creates both **motivation** and **fairness** in the initial stage.

![Minh họa](/13.png)`,
        },
        {
          title: "Development of culture, education, science, and social justice",
          content: `**Content:** Socialism focuses on **building an advanced culture imbued with national identity**, **raising public knowledge**, and **ensuring social justice**. **Education** and **science** are prioritized for development to **improve human resource quality** and **promote creativity**. **Social justice** is demonstrated by **gradually reducing the rich-poor gap**, **ensuring social security**, and **creating equal opportunities** for everyone.

**Relation to Vietnam's reality:** Vietnam **promotes universal education**, **develops healthcare** and **social security policies** such as **poverty reduction, health insurance**, and **support for remote areas**.

**📌 Highlights:**
- **Culture – education – science** are the **soft drivers** of development.
- **Social security & justice** ensure that **no one is left behind**.

![Minh họa](/14.png)`,
        },
        {
          title: "National unity and international solidarity",
          content: `**Content:** Socialism emphasizes **unity among ethnic groups** within a nation and **among nations** worldwide, based on the **principles of equality and mutual respect**. In the context of **globalization**, socialism stresses **international cooperation** to **build peace, stability, and sustainable development**.

**Relation to Vietnam's reality:** Vietnam **implements a policy of great national unity**, **harmonizing minority ethnic groups**, and also **actively participates** in international organizations like the **United Nations and ASEAN** to **promote cooperation and peace**.

**📌 Highlights:**
- **Internal and external unity** is the **combined** resource for development.
- The spirit of **peace and cooperation** is linked to **national sovereignty & interests**.

![Minh họa](/15.png)`,
        },
        {
          title: "Under the leadership of the Communist Party",
          content: `**Content:** The **Communist Party** plays a **leading role** in **organizing, orienting, and building** socialist society. The Party **represents the interests of the working class and the working people**, ensuring **unity** in **goals and actions**. The **leadership of the Party** is the **key factor** to ensure the **victory** of the **socialist revolution**.

**Relation to Vietnam's reality:** The **Communist Party of Vietnam** is the **sole leading force**, which **organizes the implementation of the reform policy** and **builds socialism** in line with the **country's conditions**.

**📌 Highlights:**
- **The political nucleus role**: orientation, mobilization, supervision.
- The condition for **unifying the will and actions** of the whole society.

![Minh họa](/16.png)`,
        },
      ],
    },
  },
  ja: {
    // I. 社会主義
    "chu-nghia-xa-hoi": {
      title: "I. 社会主義",
      sections: [
        {
          title: "経済的社会構成体理論",
          content: `**経済的社会構成体理論：**

- **マルクス**と**エンゲルス**によって構築され、特に資本主義社会の歴史を研究し、**社会の発展法則を明らかにした**。
- **社会を絶え間ない変革**の過程にあると**捉える**。
- **レーニン**がこれを補完・発展させ、**現実化**し、**マルクス・レーニン主義**となった。

**📌 覚えておくべきポイント（要約）：**
- この理論は、社会を静的なものではなく、**法則に従って動くものとして捉える**のに役立つ。
- **なぜ社会の形態が交代していくのか**を説明する基礎を築いた。
- **史的唯物論の観点**からベトナムの現実を分析するために使用される。

![Minh họa](/1.png)`,
        },
        {
          title: "歴史的必然性",
          content: `**歴史的必然性：** この理論は、**資本主義**経済的社会構成体が**共産主義**経済的社会構成体によって**必然的に交代する**ことを、**歴史的-自然的な過程**として指摘している。

**🔎 強調点：**
- 「必然」とは主観的な意志ではなく、資本主義の**内部矛盾**によるもの。
- この過程は**歴史的-自然的な性質**を持ち、長く、紆余曲折があり、不均一である。

`,
        },
        {
          title: "重要な物質的前提",
          content: `**重要な物質的前提：** **生産力の発展**と**労働者階級の成熟**。

**🧭 簡単な説明：**
- **生産力**＝技術、道具、技能、生産性...が**爆発的に発展** → 適切な新しい生産関係を要求する。
- **労働者階級**＝**組織的で規律ある**社会勢力で、**革命を指導する**能力を持つ。

![Minh họa](/3.jpg)`,
        },
        {
          title: "発展段階",
          content: `**発展段階：** 共産主義経済的社会構成体は**二つの段階**を経て発展する。
- **低い**段階（*社会主義*）。
- **高い**段階（*共産主義*）。

**📚 簡単な区別：**
- *社会主義（低い段階）*：まだ**古い痕跡**が残り、分配は**主に労働に応じて**行われ、複数の所有形態が共存する。
- *共産主義（高い段階）*：**公的所有が発展**し、生産力が非常に高く、「**能力に応じて働き、必要に応じて受け取る**」という目標（理想）。

![Minh họa](/4.jpg)`,
        },
        {
          title: "共産主義への過渡期",
          content: `**共産主義への過渡期：**

- 資本主義社会と共産主義社会の間の**革命的な変革の時期**である。
- **資本主義から生まれたばかり**の社会であり、**古い社会の多くの痕跡**（経済、道徳、精神）を**残している**。
- **レーニンは強調した**：高度に発達した資本主義を持たない国々にとっては、資本主義から社会主義への**比較的長い過渡期**が必要である。

**🧩 記憶と例：**
- **古いものを破壊**すると同時に**新しいものを構築**する → 必然的に**複雑で長期にわたる**。
- 代表的な任務：**生産関係の改革**、**工業化**、**新しいタイプの国家建設**、**国民の知識・文化水準の向上**。

![Minh họa](/5.png)`,
        },
      ],
    },

    // II. 社会主義誕生の条件
    "dieu-kien-ra-doi": {
      title: "II. 社会主義誕生の条件",
      sections: [
        {
          title: "理論的根拠",
          content: `**理論的根拠**

- **マルクスとエンゲルス**：社会主義は**自然に現れる**ものではなく、資本主義社会の内部における**発展と矛盾の結果**である。
- **レーニン**：共産主義は**資本主義から生まれる**ものであり、**現代の労働者階級の誕生**と結びついている。

**🧠 学術的意義：**
- 社会主義は**歴史の産物**であり、強制的に導入されるモデルではない。
- **中心的な対象**：労働者階級と、他の労働者との**同盟**。

![Minh họa](/9.png)`,
        },
        {
          title: "経済的条件",
          content: `**経済的条件**

- **生産力**が**産業革命**によって高度に発展する。
- **社会化された性質**を持つ生産力と、**私的所有に基づく生産関係**との間に**激しい矛盾**が生じる → 生産関係は**「鎖」**となる。
- **この矛盾こそが**、必然的に**生産関係の変革**を要求する – つまり、**新しい経済形態が誕生する**必要がある。
- *例：* まるで**きつすぎるジャケット**のようだ。最初はちょうどよかったが、後に**不適切**になり、**新しい経済形態**が必要となる。

**📌 要点：**
- **生産力 > 生産関係の枠組み**となったとき、社会は**枠組みを変える**（改革/革命）ことを余儀なくされる。

![Minh họa](/6.png)`,
        },
        {
          title: "政治的・社会的条件",
          content: `**政治的・社会的条件**

- **労働者階級**が成熟し、数が多く、**規律**があり、ブルジョアジーと**直接的に対立**する。
- **階級矛盾**がますます激化 → **経済闘争**が**政治闘争**に変わる。
- *例：* **1917年のロシア十月革命**。
- **共産党の誕生** – 運動を**組織し、指導する**「**先鋒隊**」、まるでチームを導く「**コーチ**」のようだ。

**🧭 簡単な結論：**
- 社会主義は**自力で生まれる**ものではなく、**先鋒党の指導**のもとでの**階級闘争**を通じて生まれる。

![Minh họa](/7.png)`,
        },
        {
          title: "意義と現実",
          content: `**意義と現実**

- **生産力の発展＋労働者階 cấp** → 社会主義の**前提**を**作り出す**。
- **しかし**、**共産党の指導**のもとでのプロレタリア革命だけが、**潜在能力を現実に変える**ことができる。
- **歴史が証明する**：**1917年のロシア**と**1949年の中国**は**典型的な証拠**である。

**✅ 簡単に覚えておく：**
- **前提**があるだけでは不十分 → **政治的条件**と**正しい指導**が必要である。

![Minh họa](/8.png)`,
        },
      ],
    },

    // III. 社会主義の本質的特徴
    "dac-trung-ban-chat": {
      title: "III. 社会主義の本質的特徴",
      sections: [
        {
          title: "はじめに",
          content: `**はじめに：** **マルクス・レーニン主義**とベトナムの教科書によると、**社会主義には6つの本質的特徴**があり、資本主義に対する**優位性**を反映している。

**🎯 この章の目的：**
- 各**特徴の意味**を把握し、**ベトナムの現実**と関連付ける。

![Minh họa](/10.png)`,
        },
        {
          title: "階級の解放、民族の解放、社会の解放、そして人間の包括的な発展",
          content: `**内容：** これは社会主義の**核となる本質**であり、**階級搾取の状況を廃止**し、**労働者を**抑圧と不正義から**解放**することを目的としている。社会主義は、人間の肉体、精神、道徳の**自由で包括的な発展を促進**し、人々が資本主義のように**疎外**されることなく、歴史の**創造的な主体**となるのを助ける。

**ベトナムの現実との関連：** ベトナム共産党は、「**豊かな国民、強い国、民主的、公正、文明的**」というモットーで社会主義を構築する目標を掲げ、**人間の包括的な発展**を目指している。

**📌 強調点：**
- 焦点は**人間**：自由、創造性、尊厳。
- **搾取と不正義をなくす** → **包括的な発展**への道を開く。

![Minh họa](/11.png)`,
        },
        {
          title: "労働者人民が主人である",
          content: `**内容：** 労働者人民は社会主義社会の**主体**であり、新しいタイプの国家（**人民の、人民による、人民のための国家**）を通じて**権力を掌握する**。これは**社会主義民主主義**によって示され、すべての決定が**労働者人民の利益**に奉仕する。**共産党は指導する**が、**人民の意志と願望に基づき**、**選挙、監視**、**社会管理への参加**といったメカニズムを通じて**主人の権利**が実行されることを保証する。

**ベトナムの現実との関連：** ベトナムは、**国会、祖国戦線**、そして**政治・社会組織**といったメカニズムを通じて、人民の主人の権利を保証する**社会主義法治国家**を**建設**している。

**📌 強調点：**
- **社会主義民主主義**＝**権力が人民に属すること**を**保証する**メカニズム。
- 指導は、人民の参加と監視と**共に行われる**。

![Minh họa](/12.png)`,
        },
        {
          title: "現代的な生産力と主要な生産手段の公的所有制に基づく高度に発展した経済を持つ",
          content: `**内容：** 社会主義経済は、**公的所有制**（**国家所有**と**集団所有**を含む）を**基盤**とし、**初期段階**では他の所有形態と**結合**する。**現代的な生産力**には、**工業化、科学技術の応用、機械化**が含まれる。**労働に応じた分配**が**主要な原則**であり、各人の**労働貢献**に基づいた**公正さ**を保証する。初期段階では、**生産を促進する**ために**複数の経済セクター**が依然として存在する。

**ベトナムの現実との関連：** ベトナムは**社会主義志向の市場経済**を**発展**させており、その中で**国家経済が主導的な役割**を果たし、**民間経済**や**他の経済セクター**と**結合**している。

**📌 強調点：**
- **主要な公的所有**＋**現代的な生産力**＝社会主義の物質的基盤。
- **労働に応じた分配**は、初期段階で**動機**と**公正さ**の両方を生み出す。

![Minh họa](/13.png)`,
        },
        {
          title: "文化、教育、科学、そして社会正義の発展",
          content: `**内容：** 社会主義は、**国民のアイデンティティに満ちた先進文化を築き**、**国民の知識水準を向上**させ、**社会正義を保証する**ことに重点を置いている。**教育**と**科学**は、**人材の質を向上**させ、**創造性を促進**するために優先的に発展させられる。**社会正義**は、**貧富の差を徐々に縮小**し、**社会保障を保証**し、すべての人々に**平等な機会を創出する**ことによって示される。

**ベトナムの現実との関連：** ベトナムは、**教育の普及を推進**し、**医療**と**社会保障政策**（**貧困削減、健康保険**、そして**遠隔地への支援**など）を**発展**させている。

**📌 強調点：**
- **文化・教育・科学**は発展の**ソフトな原動力**である。
- **社会保障と公正**は、**誰も置き去りにされないこと**を保証する。

![Minh họa](/14.png)`,
        },
        {
          title: "民族の団結と国際的な連帯",
          content: `**内容：** 社会主義は、**平等と相互尊重の原則**に基づき、一国内の**民族間の団結**と世界中の**国家間の団結**を重視する。**グローバル化**の文 mạchにおいて、社会主義は**国際協力**を**平和、安定、そして持続可能な発展を築く**ために強調する。

**ベトナムの現実との関連：** ベトナムは、**少数民族との調 hòa**をđồ án đại đoàn kết dân tộc, **hòa hợp các dân tộc thiểu số**, đồng thời **tích cực tham gia** các tổ chức quốc tế như **Liên Hợp Quốc, ASEAN** để **thúc đẩy hợp tác và hòa bình**.

**📌 強調 điểm:**
- **Đoàn kết trong – ngoài** là nguồn lực **tổng hợp** của phát triển.
- Tinh thần **hòa bình, hợp tác** gắn với **chủ quyền & lợi ích quốc gia**.

![Minh họa](/15.png)`,
        },
        {
          title: "Có sự lãnh đạo của Đảng Cộng sản",
          content: `**Nội dung:** **Đảng Cộng sản** đóng vai trò **lãnh đạo** trong việc **tổ chức, định hướng và xây dựng** xã hội xã hội chủ nghĩa. Đảng **đại diện cho lợi ích của giai cấp công nhân và nhân dân lao động**, đảm bảo **sự thống nhất** trong **mục tiêu và hành động**. **Sự lãnh đạo của Đảng** là **yếu tố then chốt** để đảm bảo **thắng lợi** của **cách mạng xã hội chủ nghĩa**.

**Liên hệ thực tiễn ở Việt Nam:** **Đảng Cộng sản Việt Nam** là **lực lượng lãnh đạo duy nhất**, **tổ chức thực hiện đường lối đổi mới** và **xây dựng chủ nghĩa xã hội** phù hợp với **điều kiện đất nước**.

**📌 Điểm nhấn:**
- **Vai trò hạt nhân chính trị**: định hướng, huy động, kiểm tra.
- Điều kiện để **thống nhất ý chí – hành động** toàn xã hội.

![Minh họa](/16.png)`,
        },
      ],
    },
  },
};