import type { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";
import Image from "next/image";
import Head from "next/head";
import FadeProvider from "../components/animated/FadeProvider";

// Moderation done right
// delete messages
// ban users
// kick users
// mute users
// warn users

// Interactive Dashboard
// add Bot to new Servers
// manage bot settings in your server

// Mini Games
// Tic Tac Toe
// Quiz
// Snake

const Home: NextPage = () => {
  return (
    <NavbarProvider>
      <Head>
        <title>Home | GoBot</title>
      </Head>

      <FadeProvider>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center">
            <Image
              src="/GoBotTransparent.png"
              width={256}
              height={256}
              alt="GoBot"
            />
          </div>
          <div className="font-mono text-center text-6xl">GoBot</div>
          <div className="font-mono text-center text-2xl">DISCORD BOT</div>
        </div>
      </FadeProvider>
      <br />
      <FadeProvider>
        <div className="rounded bg-slate-800 p-5 m-5 inline-block">
          <div className="font-mono text-3xl">Moderation done right</div>
          <br />
          <div>
            <ul className="list-disc list-inside">
              <li>
                <span className="font-mono text-xl">Delete Messages</span>
              </li>
              <li>
                <span className="font-mono text-xl">Ban Users</span>
              </li>
              <li>
                <span className="font-mono text-xl">Kick Users</span>
              </li>
              <li>
                <span className="font-mono text-xl">Mute Users</span>
              </li>
              <li>
                <span className="font-mono text-xl">Warn Users</span>
              </li>
            </ul>
          </div>
        </div>
      </FadeProvider>
      <br />

      <FadeProvider>
        <div>
          <div className="inline-block">
            {/* Placeholder Image */}
            <Image
              src="/GoBotTransparent.png"
              width={256}
              height={256}
              alt="GoBot"
            />
          </div>
          <div className="rounded bg-slate-800 p-5 m-5 inline-block float-right">
            <div className="font-mono text-3xl">Interactive Dashboard</div>
            <br />
            <div>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-mono text-xl">
                    Add Bot to new Servers
                  </span>
                </li>
                <li>
                  <span className="font-mono text-xl">
                    Manage bot settings from the website
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FadeProvider>
      <br />

      <FadeProvider>
        <div className="rounded bg-slate-800 p-5 m-5 inline-block">
          <div className="font-mono text-3xl">Mini Games</div>
          <br />
          <div>
            <ul className="list-disc list-inside">
              <li>
                <span className="font-mono text-xl">Tic Tac Toe</span>
              </li>
              <li>
                <span className="font-mono text-xl">Quiz</span>
              </li>
              <li>
                <span className="font-mono text-xl">Snake</span>
              </li>
            </ul>
          </div>
        </div>
      </FadeProvider>
    </NavbarProvider>
  );
};

export default Home;
