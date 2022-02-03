import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@skynexui/components";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Names = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Score = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

export default function Home() {
  const PUBLIC_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU1MjkzMiwiZXhwIjoxOTU5MTI4OTMyfQ.8F99JfGkl3HnKnJuhuGwfXGK4vpytW9He63Ydc2ZlcE";
  const URL = "https://ddzypugbirpuffsjtigg.supabase.co";

  const supabaseClient = createClient(URL, PUBLIC_ANON_KEY);

  const [arthurArgs, setArthurArgs] = useState(0);
  const [juliaArgs, setJuliaArgs] = useState(0);

  const [arthurGame, setArthurGame] = useState(0);
  const [juliaGame, setJuliaGame] = useState(0);

  useEffect(async () => {
    const data = await supabaseClient
      .from("placar")
      .select("*")
      .order("id", { ascending: true });
    console.log(data);
    setArthurArgs(data.data[0].value);
    setJuliaArgs(data.data[1].value);

    setArthurGame(data.data[2].value);
    setJuliaGame(data.data[3].value);
  }, []);

  return (
    <>
      <Body>
        <Names>
          <h1 style={{ marginRight: "20px" }}>Arthur</h1>
          <h1>Julia</h1>
        </Names>
        <p>Argumentos:</p>
        <Score style={{ display: "flex", flexDirection: "row" }}>
          <Button
            iconName="FaMinus"
            onClick={async () => {
              if (arthurArgs > 0) {
                setArthurArgs(arthurArgs - 1);
                await supabaseClient
                  .from("placar")
                  .update({ value: arthurArgs - 1 })
                  .match({ id: 1 });
              }
            }}
            colorVariant="dark"
            variant="tertiary"
          />
          <Button
            iconName="FaPlus"
            onClick={async () => {
              setArthurArgs(arthurArgs + 1);
              await supabaseClient
                .from("placar")
                .update({ value: arthurArgs + 1 })
                .match({ id: 1 });
            }}
            variant="tertiary"
            colorVariant="dark"
          />
          <h1>{arthurArgs}</h1>
          <h1>X</h1>
          <h1>{juliaArgs}</h1>
          <Button
            iconName="FaPlus"
            onClick={async () => {
              setJuliaArgs(juliaArgs + 1);
              await supabaseClient
                .from("placar")
                .update({ value: juliaArgs + 1 })
                .match({ id: 2 });
            }}
            variant="tertiary"
            colorVariant="dark"
          />
          <Button
            iconName="FaMinus"
            onClick={async () => {
              if (juliaArgs > 0) {
                setJuliaArgs(juliaArgs - 1);
                await supabaseClient
                  .from("placar")
                  .update({ value: juliaArgs - 1 })
                  .match({ id: 2 });
              }
            }}
            variant="tertiary"
            colorVariant="dark"
          />
        </Score>
        <p>Gameplay ousada:</p>
        <Score style={{ display: "flex", flexDirection: "row" }}>
          <Button
            iconName="FaMinus"
            onClick={async () => {
              if (arthurGame > 0) {
                setArthurGame(arthurGame - 1);
                await supabaseClient
                  .from("placar")
                  .update({ value: arthurGame - 1 })
                  .match({ id: 3 });
              }
            }}
            variant="tertiary"
            colorVariant="dark"
          />
          <Button
            iconName="FaPlus"
            onClick={async () => {
              setArthurGame(arthurGame + 1);
              await supabaseClient
                .from("placar")
                .update({ value: arthurGame + 1 })
                .match({ id: 3 });
            }}
            variant="tertiary"
            colorVariant="dark"
          />
          <h1>{arthurGame}</h1>
          <h1>X</h1>
          <h1>{juliaGame}</h1>
          <Button
            iconName="FaPlus"
            onClick={async () => {
              setJuliaGame(juliaGame + 1);
              await supabaseClient
                .from("placar")
                .update({ value: juliaGame + 1 })
                .match({ id: 4 });
            }}
            variant="tertiary"
            colorVariant="dark"
          />
          <Button
            iconName="FaMinus"
            onClick={async () => {
              if (juliaGame > 0) {
                setJuliaGame(juliaGame - 1);
                await supabaseClient
                  .from("placar")
                  .update({ value: juliaGame - 1 })
                  .match({ id: 4 });
              }
            }}
            variant="tertiary"
            colorVariant="dark"
          />
        </Score>
      </Body>
    </>
  );
}
