
// import PoliticianHeaderCard from "./PoliticianHeaderCard"

// interface Politician{
//     _id:string
//     name:string
//     photo:string
//     party:{
//         _id:string
//         name:string
//         abbreviation:string
//         logo:string
//     }
// }

// interface Props{
//     params:Promise<{id:string}>
// }

// export default async function PoliticianHeader({params}:Props) {

//     const {id} = await params;

//     const res = await fetch(`process.env.NEXT_PUBLIC_APP_URL}/api/politician/${id}`,
//         {
//             next:{
//                 revalidate:60,
//             }
//         }
//     );

// const data = await res.json();
// const politician: Politician= await data.data;
    
//     return(
//         <PoliticianHeaderCard
//         politician={politician}
//         />
//     )
// }