import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalButton from "@/components/GlobalButton";
import { pb } from "@/db/pb";

export default function SingleChallangeScreen() {
  const { challangeId } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await pb
        .collection("Challanges")
        .getList(0, 5, { filter: `id = '${challangeId}'` });
      console.log(res.items[0]);
      setData(res.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text className="text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
          repellat quos tempora, inventore explicabo aspernatur corrupti
          nesciunt quasi doloremque esse cupiditate quod, soluta eaque sint.
          Corrupti facilis aperiam odio harum molestiae in assumenda esse rerum?
          Ratione fugiat sunt repellat perferendis? Culpa veritatis ullam odio
          necessitatibus assumenda, nemo repellat nisi fugiat, dicta iste cum
          doloremque expedita molestias cupiditate reprehenderit quibusdam error
          dolores perspiciatis ratione! Nostrum, fugit unde accusantium quidem
          tempore quae tempora obcaecati? Doloremque repudiandae culpa quis ab
          in, illo harum ea ipsa optio inventore aut temporibus deserunt,
          reprehenderit ut dolorem minus voluptatibus molestias placeat est.
          Expedita ipsum odit nisi eveniet! Neque, ratione at vel tempora iure
          modi hic veritatis ea, adipisci eius soluta sit quia recusandae iste!
          Molestias omnis hic, tempora pariatur minima doloribus modi non quam
          similique ducimus debitis cupiditate recusandae libero laudantium
          perferendis dolore esse atque. Ad itaque quis sit id reprehenderit
          consectetur ducimus quaerat fuga vel dignissimos corrupti officiis
          omnis necessitatibus eaque ab sint animi maiores, quasi cum nam
          expedita ex beatae recusandae atque. Eos dignissimos reprehenderit,
          ducimus ullam voluptatibus iusto. Vero, corporis nulla quas harum rem
          illum laboriosam inventore voluptatem facilis assumenda provident ad,
          nesciunt reiciendis voluptatum similique debitis voluptate? Maxime,
          dolor consequatur labore illum amet perferendis nostrum est quidem
          voluptatibus, quo cumque provident ex magni, deserunt adipisci?
          Aliquid, corporis enim tempore, cumque maxime commodi nihil
          repudiandae quae labore culpa nostrum totam ea vel possimus! Nihil
          iure corporis blanditiis, dolor, optio praesentium dicta eius expedita
          pariatur temporibus repudiandae incidunt repellat adipisci ipsum
          tempora! Similique adipisci debitis provident facere aliquam nulla
          quidem officiis ducimus cumque vitae eligendi obcaecati reprehenderit
          dolore eos quis recusandae explicabo quos accusamus voluptatem iure,
          ab sapiente laboriosam. Suscipit repudiandae odio magni, quos
          adipisci, ut recusandae pariatur a iure incidunt voluptatum dolorum
          quisquam tempore odit quibusdam debitis necessitatibus praesentium
          maxime doloremque iusto! Assumenda cum natus quae, dignissimos iusto
          ad laudantium sapiente distinctio at sit consequuntur provident ipsam
          modi odit iste labore velit fuga nemo reprehenderit quibusdam, placeat
          officia! Ipsam maxime labore corporis, impedit voluptas voluptatum
          optio, tempore minus minima quo consequuntur. Nobis hic ducimus
          repellendus modi minus. Minima illo ducimus quo dolores maiores atque
          quibusdam cumque dolore beatae obcaecati eos, vero fugiat modi non
          deserunt, maxime labore rerum provident quam excepturi. Animi quisquam
          vel sunt dolor a minima placeat cum labore earum neque repellendus
          quos ad voluptas, eveniet debitis provident cupiditate ratione magni,
          deserunt quam. Cum aperiam distinctio assumenda ullam veritatis. Omnis
          aliquid nesciunt mollitia quam! Ducimus magnam qui, illum corrupti
          itaque minus quam, et debitis quos libero id dolor commodi
          consequuntur quas laudantium blanditiis? Consequatur iste tempora
          quia. Suscipit voluptatibus modi rerum quam odio eaque eveniet ipsa
          pariatur amet voluptatem sint ea numquam laboriosam tempora explicabo
          optio, porro nam expedita dolor voluptate dicta officiis quod. Earum,
          asperiores praesentium odit maxime veniam natus amet excepturi non a
          corrupti vitae! Consequatur cum, mollitia porro sunt, soluta ducimus
          illo fugiat, ratione necessitatibus exercitationem harum debitis
          aliquid totam repellat ipsum ab delectus impedit ex! Vel nesciunt
          veniam, asperiores neque laboriosam deserunt impedit voluptatibus,
          dolorum modi, maiores iure?
        </Text>
      </ScrollView>
      <GlobalButton title="Cancel" />
    </SafeAreaView>
  );
}
