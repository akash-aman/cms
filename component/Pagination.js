import React from 'react';
import { usePagination } from '@material-ui/lab/Pagination';
import  Link from "next/link"
import { useRouter } from 'next/router';



const Pagination = (props) => {

  const router = useRouter();
  
 const style = {
    justifyContent: 'center',
    listStyle: 'none',
    display: 'flex',
  }
  const { items } = usePagination({
    count: props.totalPage,
    page:parseInt(props.page),
    
});
  // const pageChange=(page)=>{
  //     if(page===1)
  //       {
  //          navigate(`/posts`);
  //       }
  //       else{
  //         navigate(`/posts/${page}`);
  //       }     
  //   }
 

  
  return (
    <nav>
      <ul style={style}>
        {items.map(({ page, type, selected, ...item }, index ) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
            
              // <Link type="button" style={{ fontWeight: selected ? 'bold' : undefined }} onClick={() => {return pageChange(page)} }>
              //   {page}
              // </Link>
              <Link type="button" style={{ fontWeight: selected ? 'bold' : undefined }} href={page===1 ? `/catalog` : `/catalog/${page}`}>
                <button style={{ fontWeight: selected ? 'bold' : undefined  }}>
                  {page}
                </button>
              </Link>
            
            );
          } else {
           children=(
                <button type="button" onClick={page===1 ? () => router.push(`/catalog`) : () => router.push(`/catalog/${page}`) } disabled={type === 'next' ? ((page-1) === props.totalPage ? true : false)  : ((page) === 0 ? true : false)} >
                {type}
              </button>
           );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}


export default Pagination