import Head from 'next/head'

export const getStaticPaths = async() => {

    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()

    const paths = data.map(ninja => {
        return{
            params: { id: ninja.id.toString() }
        }
    })

    return{
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
    const data = await res.json()

    return {
        props: { ninja: data }
    }
}

const Details = ({ ninja }) => {
    return (
        <>
        <Head>
            <title>Ninja List | Ninja - {ninja.id.toString()}</title>
        </Head>
        <div>
            <h2>{ ninja.name }</h2>
            <p>{ ninja.email }</p>
            <p>{ ninja.website }</p>
            <p>{ ninja.address.city }</p>
        </div>
        </>
     );
}
 
export default Details;