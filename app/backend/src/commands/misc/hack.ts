import { Command } from "@utils/commandTypes/Command";
import { randInt, randomChoice } from "@utils/random";
import sleep from "sleep-promise";
import { Message } from "discord.js";

const cmd = new Command({
  name: "hack",
  description: "Hacks the specified user",
  usage: "hack [@user]",
  category: "misc",
  aliases: ["hollywood"],
  async execute(msg: Message, _args: string[]) {
    const victim = msg.mentions.users.first();
    if (!victim) {
      await msg.reply("Please specify a User");
      return;
    }

    const gender = ["Male", "Female", "Trans", "Other", "Retard"];
    const age = randInt(10, 25).toString();
    const height = [
      "4'6\"",
      "4'7\"",
      "4'8\"",
      "4'9\"",
      "4'10\"",
      "4'11\"",
      "5'0\"",
      "5'1\"",
      "5'2\"",
      "5'3\"",
      "5'4\"",
      "5'5\"",
      "5'6\"",
      "5'7\"",
      "5'8\"",
      "5'9\"",
      "5'10\"",
      "5'11\"",
      "6'0\"",
      "6'1\"",
      "6'2\"",
      "6'3\"",
      "6'4\"",
      "6'5\"",
      "6'6\"",
      "6'7\"",
      "6'8\"",
      "6'9\"",
      "6'10\"",
      "6'11\"",
    ];
    const weight = randInt(60, 300).toString();
    const hair_color = ["Black", "Brown", "Blonde", "White", "Gray", "Red"];
    const skin_color = ["White", "Pale", "Brown", "Black", "Light-Skin"];
    const religion = [
      "Christian",
      "Muslim",
      "Atheist",
      "Hindu",
      "Buddhist",
      "Jewish",
    ];
    const sexuality = [
      "Straight",
      "Gay",
      "Homo",
      "Bi",
      "Bi-Sexual",
      "Lesbian",
      "Pansexual",
    ];
    const education = [
      "High School",
      "College",
      "Middle School",
      "Elementary School",
      "Pre School",
      "Retard never went to school LOL",
    ];
    const ethnicity = [
      "White",
      "African American",
      "Asian",
      "Latino",
      "Latina",
      "American",
      "Mexican",
      "Korean",
      "Chinese",
      "Arab",
      "Italian",
      "Puerto Rican",
      "Non-Hispanic",
      "Russian",
      "Canadian",
      "European",
      "Indian",
    ];
    const occupation = [
      "Retard has no job LOL",
      "Certified discord retard",
      "Janitor",
      "Police Officer",
      "Teacher",
      "Cashier",
      "Clerk",
      "Waiter",
      "Waitress",
      "Grocery Bagger",
      "Retailer",
      "Sales-Person",
      "Artist",
      "Singer",
      "Rapper",
      "Trapper",
      "Discord Thug",
      "Gangster",
      "Discord Packer",
      "Mechanic",
      "Carpenter",
      "Electrician",
      "Lawyer",
      "Doctor",
      "Programmer",
      "Software Engineer",
      "Scientist",
    ];
    const salary = [
      "Retard makes no money LOL",
      "$" + randInt(0, 1000),
      "<$50,000",
      "<$75,000",
      "$100,000",
      "$125,000",
      "$150,000",
      "$175,000",
      "$200,000+",
    ];
    const location = [
      "Retard lives in his mom's basement LOL",
      "America",
      "United States",
      "Europe",
      "Poland",
      "Mexico",
      "Russia",
      "Pakistan",
      "India",
      "Some random third world country",
      "Canada",
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];
    const email = [
      "@gmail.com",
      "@yahoo.com",
      "@hotmail.com",
      "@outlook.com",
      "@protonmail.com",
      "@disposablemail.com",
      "@aol.com",
      "@edu.com",
      "@icloud.com",
      "@gmx.net",
      "@yandex.com",
    ];
    const dob = `${randInt(1, 12)}/${randInt(1, 32)}/${randInt(1950, 2021)}`;
    const name = [
      "James Smith",
      "Michael Smith",
      "Robert Smith",
      "Maria Garcia",
      "David Smith",
      "Maria Rodriguez",
      "Mary Smith",
      "Maria Hernandez",
      "Maria Martinez",
      "James Johnson",
      "Catherine Smoaks",
      "Cindi Emerick",
      "Trudie Peasley",
      "Josie Dowler",
      "Jefferey Amon",
      "Kyung Kernan",
      "Lola Barreiro",
      "Barabara Nuss",
      "Lien Barmore",
      "Donnell Kuhlmann",
      "Geoffrey Torre",
      "Allan Craft",
      "Elvira Lucien",
      "Jeanelle Orem",
      "Shantelle Lige",
      "Chassidy Reinhardt",
      "Adam Delange",
      "Anabel Rini",
      "Delbert Kruse",
      "Celeste Baumeister",
      "Jon Flanary",
      "Danette Uhler",
      "Xochitl Parton",
      "Derek Hetrick",
      "Chasity Hedge",
      "Antonia Gonsoulin",
      "Tod Kinkead",
      "Chastity Lazar",
      "Jazmin Aumick",
      "Janet Slusser",
      "Junita Cagle",
      "Stepanie Blandford",
      "Lang Schaff",
      "Kaila Bier",
      "Ezra Battey",
      "Bart Maddux",
      "Shiloh Raulston",
      "Carrie Kimber",
      "Zack Polite",
      "Marni Larson",
      "Justa Spear",
    ];
    const phone = `${randInt(0, 10)}${randInt(0, 10)}${randInt(0, 10)}${randInt(
      0,
      10
    )}${randInt(0, 10)}${randInt(0, 10)}${randInt(0, 10)}${randInt(
      0,
      10
    )}${randInt(0, 10)}`;
    const password = [
      "password",
      "123",
      "mypasswordispassword",
      victim.username + "iscool123",
      victim.username + "isdaddy",
      "daddy" + victim.username,
      "ilovediscord",
      "i<3discord",
      "furryporn456",
      "secret",
      "123456789",
      "apple49",
      "redskins32",
      "princess",
      "dragon",
      "password1",
      "1q2w3e4r",
      "ilovefurries",
    ];
    const resp = await msg.reply(`\`${victim.username}\`\n`);
    await sleep(1000);
    await resp.edit(
      `\`Hacking ${victim.username}...\nHacking into the mainframe...\n\``
    );
    await sleep(1000);
    await resp.edit(
      `\`Hacking ${victim.username}...\nHacking into the mainframe...\nCaching data...\``
    );
    await sleep(1000);
    await resp.edit(
      "`Hacking {user}...\nHacking into the mainframe...\nCaching data...\nCracking SSN information...\n`"
    );
    await sleep(1000);
    await resp.edit(
      "`Hacking {user}...\nHacking into the mainframe...\nCaching data...\nCracking SSN information...\nBruteforcing love life details...`"
    );
    await sleep(1000);
    await resp.edit(
      "`Hacking {user}...\nHacking into the mainframe...\nCaching data...\nCracking SSN information...\nBruteforcing love life details...\nFinalizing life-span dox details\n`"
    );
    await sleep(1000);
    await resp.edit(
      `\`\`\`Successfully hacked ${victim.username}\nName: ${randomChoice(
        name
      )}\nGender:${randomChoice(gender)}\nAge: ${age}\nHeight: ${randomChoice(
        height
      )}\nWeight: ${weight}\nHair Color: ${randomChoice(
        hair_color
      )}\nSkin Color: ${randomChoice(
        skin_color
      )}\nDOB: ${dob}\nLocation:${randomChoice(
        location
      )}\nPhone: ${phone}\nE-Mail: ${
        victim.username + randomChoice(email)
      }\nPasswords: ${randomChoice(password)}\nOccupation: ${randomChoice(
        occupation
      )}\nAnnual Salary: ${randomChoice(salary)}\nEthnicity: ${randomChoice(
        ethnicity
      )}\nReligion: ${randomChoice(religion)}\nSexuality: ${randomChoice(
        sexuality
      )}\nEducation: ${randomChoice(education)}\`\`\``
    );
  },
});

export default cmd;
