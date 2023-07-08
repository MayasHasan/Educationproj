using Core.Paging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IList<T>> GetAllAsync();
        //Task<IList<T>> GetAllAsync(PagingDetails pagingDetails, Expression<Func<T, bool>> exprssion = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null);
    Task< IQueryable<T>>GetAllAsync( Expression<Func<T, bool>> exprssion = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null);
        Task<T> GetAsync(Expression<Func<T, bool>> exprssion, List<string> includes = null);
        Task<T> AddAsync(T entity);
        Task Delete(Guid id);
        void DeleteRange(IList<T> entities);
         T Update(T entity);
        Task<int> CountAsync();




        //  Task<PagedList<T>> GetAllAsync(PagingDetails pagingDetails,
        //Expression<Func<T, bool>> exprssion = null,
        //Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        //List<string> includes = null);



    }
}
